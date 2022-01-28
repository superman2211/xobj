import { EncodeState, EncoderMethod } from '../encode';
import { ValueType } from '../ValueType';

export function detectEmpty(state: EncodeState, value: any): ValueType {
	if (typeof value === 'undefined') {
		return ValueType.UNDEFINED;
	}

	if (value === null) {
		return ValueType.NULL;
	}

	return ValueType.UNKNOWN;
}

export function initEmptyEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.UNDEFINED, () => {});
	encoders.set(ValueType.NULL, () => {});
}
