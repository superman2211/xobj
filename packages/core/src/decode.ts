/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { ValueType } from './types';
import { initEmptyDecoders } from './decoders/empty';
import { initNumberDecoders } from './decoders/number';
import { initStringDecoders } from './decoders/string';
import { initArrayDecoders } from './decoders/array';
import { initBooleanDecoders } from './decoders/boolean';
import { initObjectDecoders } from './decoders/object';
import { initAnyDecoders } from './decoders/any';
import { initSetDecoders } from './decoders/set';
import { initMapDecoders } from './decoders/map';
import { initArrayBufferDecoders } from './decoders/array-buffer';
import { initTypedArrayDecoders } from './decoders/typed-array';
import { initDateDecoders } from './decoders/date';

export interface DecodeOptions {
	decoders?: Map<ValueType, DecoderMethod>;
}

export interface DecodeState {
	reader: BufferReader;
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
initSetDecoders(DEFAULT_DECODERS);
initMapDecoders(DEFAULT_DECODERS);
initArrayBufferDecoders(DEFAULT_DECODERS);
initTypedArrayDecoders(DEFAULT_DECODERS);
initDateDecoders(DEFAULT_DECODERS);
initObjectDecoders(DEFAULT_DECODERS);

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new BufferReader(buffer);
	const decoders = options?.decoders ?? DEFAULT_DECODERS;

	const state: DecodeState = {
		reader,
		decoders,
	};

	const decoder = decoders.get(ValueType.ANY);

	if (!decoder) {
		throw `Decoder method not found for object type: ${ValueType.ANY}`;
	}

	const value = decoder(state);
	return value;
}
