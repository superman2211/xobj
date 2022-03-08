import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';
import { encodeArray } from './array';

export function detectSet(state: EncodeState, value: any): ValueType {
	if (value instanceof Set) {
		return ValueType.SET;
	}

	return ValueType.UNKNOWN;
}

export function encodeSet(state: EncodeState, value: Set<any>) {
	const array = [...value.values()];
	encodeArray(state, array);
}

export function initSetEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.SET, encodeSet);

	detectors.push(detectSet);
}
