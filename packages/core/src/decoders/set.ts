import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';
import { decodeArray } from './array';

export function decodeSet(state: DecodeState): any {
	const array = decodeArray(state);
	return new Set(array);
}

export function initSetDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.SET, decodeSet);
}
