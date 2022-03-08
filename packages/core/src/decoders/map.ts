import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';
import { decodeArray } from './array';

export function decodeMap(state: DecodeState): any {
	const keys = decodeArray(state);
	const values = decodeArray(state);

	const map = new Map();
	for (let i = 0; i < keys.length; i++) {
		map.set(keys[i], values[i]);
	}
	return map;
}

export function initMapDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.MAP, decodeMap);
}
