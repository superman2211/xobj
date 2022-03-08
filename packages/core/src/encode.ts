/* eslint-disable no-use-before-define */
import { BufferWriter } from '@xobj/buffer';
import { initAnyEncoders } from './encoders/any';
import { initArrayEncoders } from './encoders/array';
import { initBooleanEncoders } from './encoders/boolean';
import { initEmptyEncoders } from './encoders/empty';
import { initNumberEncoders } from './encoders/number';
import { initObjectEncoders } from './encoders/object';
import { initSetEncoders } from './encoders/set';
import { initStringEncoders } from './encoders/string';
import { ValueType } from './types';

export interface EncodeOptions {
	encoders?: Map<ValueType, EncoderMethod>;
	detectors?: DetectorMethod[];
}

export interface EncodeState {
	readonly writer: BufferWriter;
	readonly encoders: Map<ValueType, EncoderMethod>;
	readonly detectors: DetectorMethod[];
	readonly detect: DetectorMethod;
}

export type DetectorMethod = (state: EncodeState, value: any) => ValueType;
export type EncoderMethod = (state: EncodeState, value: any) => void;

export const DEFAULT_ENCODERS = new Map<ValueType, EncoderMethod>();
export const DEFAULT_DETECTORS: DetectorMethod[] = [];

initAnyEncoders(DEFAULT_ENCODERS);
initEmptyEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initBooleanEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initNumberEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initStringEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initArrayEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initSetEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);
initObjectEncoders(DEFAULT_ENCODERS, DEFAULT_DETECTORS);

function detect(state: EncodeState, value: any): ValueType {
	for (const detector of state.detectors) {
		const type = detector(state, value);
		if (type !== ValueType.UNKNOWN) {
			return type;
		}
	}
	return ValueType.UNKNOWN;
}

export function encode(value: any, options?: EncodeOptions): ArrayBuffer {
	const writer = new BufferWriter();
	const encoders = options?.encoders ?? DEFAULT_ENCODERS;
	const detectors = options?.detectors ?? DEFAULT_DETECTORS;

	const state: EncodeState = {
		writer,
		detectors,
		encoders,
		detect,
	};

	const encoder = encoders.get(ValueType.ANY);

	if (!encoder) {
		throw `Encoder method not found for object: ${value} with type: ${ValueType.ANY}`;
	}

	encoder(state, value);
	return state.writer.buffer;
}
