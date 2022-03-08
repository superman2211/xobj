import { EncodeState, EncoderMethod, DetectorMethod } from '../encode';
import { ValueType } from '../types';

export function detectEmpty(state: EncodeState, value: any): ValueType {
	if (typeof value === 'undefined') {
		return ValueType.UNDEFINED;
	}

	if (value === null) {
		return ValueType.NULL;
	}

	return ValueType.UNKNOWN;
}

export function initEmptyEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.UNDEFINED, () => {});
	encoders.set(ValueType.NULL, () => {});

	detectors.push(detectEmpty);
}
