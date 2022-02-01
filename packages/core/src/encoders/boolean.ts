import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectBoolean(state: EncodeState, value: any): ValueType {
	if (typeof value === 'boolean') {
		return value ? ValueType.TRUE : ValueType.FALSE;
	}

	return ValueType.UNKNOWN;
}

export function encodeBitset(state: EncodeState, value: boolean[]) {
	const { writer } = state;
	writer.writeUintVar(value.length);
	writer.writeBitset(value);
}

export function initBooleanEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.TRUE, () => { });
	encoders.set(ValueType.FALSE, () => { });
	encoders.set(ValueType.BITSET, encodeBitset);
}
