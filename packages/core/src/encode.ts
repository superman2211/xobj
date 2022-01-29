/* eslint-disable no-use-before-define */
import { StreamWriter } from '@jsbyte/stream';
import { detectArray, initArrayEncoders } from './encoders/array';
import { detectBoolean, initBooleanEncoders } from './encoders/boolean';
import { detectEmpty, initEmptyEncoders } from './encoders/empty';
import { detectNumber, initNumberEncoders } from './encoders/number';
import { detectObject, initObjectEncoders } from './encoders/object';
import { detectString, initStringEncoders } from './encoders/string';
import { ValueType } from './types';

export interface EncodeOptions {
	encoders?: Map<ValueType, EncoderMethod>;
	detectors?: DetectorMethod[];
}

export interface EncodeState {
	writer: StreamWriter;
	encoders: Map<ValueType, EncoderMethod>;
	detectors: DetectorMethod[];
}

export type DetectorMethod = (state: EncodeState, value: any) => ValueType;
export type EncoderMethod = (state: EncodeState, value: any) => void;

export const DEFAULT_ENCODERS = new Map<ValueType, EncoderMethod>();

initAnyEncoders(DEFAULT_ENCODERS);
initEmptyEncoders(DEFAULT_ENCODERS);
initBooleanEncoders(DEFAULT_ENCODERS);
initNumberEncoders(DEFAULT_ENCODERS);
initStringEncoders(DEFAULT_ENCODERS);
initArrayEncoders(DEFAULT_ENCODERS);
initObjectEncoders(DEFAULT_ENCODERS);

export const DEFAULT_DETECTORS: DetectorMethod[] = [
	detectEmpty,
	detectBoolean,
	detectNumber,
	detectString,
	detectArray,
	detectObject,
];

export function detectType(state: EncodeState, value: any): ValueType {
	for (const detector of state.detectors) {
		const type = detector(state, value);
		if (type !== ValueType.UNKNOWN) {
			return type;
		}
	}
	return ValueType.UNKNOWN;
}

export function encodeAny(state: EncodeState, value: any) {
	const type = detectType(state, value);

	if (type === ValueType.UNKNOWN) {
		throw `Unable to detect object type: ${value}`;
	}

	state.writer.writeUint8(type);

	const encoder = state.encoders.get(type);

	if (!encoder) {
		throw `Encoder method not found for object: ${value} with type: ${type}`;
	}

	encoder(state, value);
}

export function initAnyEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ANY, encodeAny);
}

export function encode(value: any, options?: EncodeOptions): ArrayBuffer {
	const writer = new StreamWriter();
	const encoders = options?.encoders ?? DEFAULT_ENCODERS;
	const detectors = options?.detectors ?? DEFAULT_DETECTORS;

	const state: EncodeState = {
		writer,
		detectors,
		encoders,
	};

	encodeAny(state, value);
	return state.writer.buffer;
}
