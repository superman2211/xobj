import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../ValueType';

export function detectString(state: EncodeState, value: any): ValueType {
	if (typeof value === 'string') {
		return ValueType.STRING;
	}

	return ValueType.UNKNOWN;
}

export function initStringEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.STRING, (state: EncodeState, value: string) => state.writer.writeString(value));
}
