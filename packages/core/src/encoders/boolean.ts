import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../ValueType';

export function detectBoolean(state: EncodeState, value: any): ValueType {
	if (typeof value === 'boolean') {
		return value ? ValueType.TRUE : ValueType.FALSE;
	}

	return ValueType.UNKNOWN;
}

export function initBooleanEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.TRUE, () => { });
	encoders.set(ValueType.FALSE, () => { });
}
