/* eslint-disable no-use-before-define */
import { StreamReader } from '@jsbyte/stream';
import { ValueType } from './types';
import { initEmptyDecoders } from './decoders/empty';
import { initNumberDecoders } from './decoders/number';
import { initStringDecoders } from './decoders/string';
import { initArrayDecoders } from './decoders/array';
import { initBooleanDecoders } from './decoders/boolean';
import { initObjectDecoders } from './decoders/object';

export interface DecodeOptions {
	decoders?: Map<ValueType, DecoderMethod>;
}

export interface DecodeState {
	reader: StreamReader;
	decoders: Map<ValueType, DecoderMethod>;
}

export type DecoderMethod = (state: DecodeState) => any;

export const DEFAULT_DECODERS = new Map<ValueType, DecoderMethod>();

initAnyDecoders(DEFAULT_DECODERS);
initEmptyDecoders(DEFAULT_DECODERS);
initBooleanDecoders(DEFAULT_DECODERS);
initNumberDecoders(DEFAULT_DECODERS);
initStringDecoders(DEFAULT_DECODERS);
initArrayDecoders(DEFAULT_DECODERS);
initObjectDecoders(DEFAULT_DECODERS);

function initAnyDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ANY, decodeAny);
}

export function decodeAny(state: DecodeState): any {
	const type = state.reader.readUint8() as ValueType;
	const decoder = state.decoders.get(type);

	if (!decoder) {
		throw `Decoder method not found for object type: ${type}`;
	}

	return decoder(state);
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new StreamReader(buffer);
	const decoders = options?.decoders ?? DEFAULT_DECODERS;

	const state: DecodeState = {
		reader,
		decoders,
	};

	const value = decodeAny(state);
	return value;
}
