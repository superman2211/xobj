import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';
import { encodeArray } from './array';

export function detectMap(state: EncodeState, value: any): ValueType {
	if (value instanceof Map) {
		return ValueType.MAP;
	}

	return ValueType.UNKNOWN;
}

export function encodeMap(state: EncodeState, value: Map<any, any>) {
	const keys = [...value.keys()];
	const values = [];
	for (const key of keys) {
		values.push(value.get(key));
	}

	encodeArray(state, keys);
	encodeArray(state, values);
}

export function initMapEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.MAP, encodeMap);

	detectors.push(detectMap);
}
