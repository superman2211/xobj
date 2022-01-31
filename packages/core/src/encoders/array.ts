import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectArray(state: EncodeState, value: any): ValueType {
	if (Array.isArray(value)) {
		return ValueType.ARRAY;
	}

	return ValueType.UNKNOWN;
}

export function encodeArray(state: EncodeState, value: Array<any>) {
	const { writer, encoders } = state;

	writer.writeUintVar(value.length);

	const encoder = encoders.get(ValueType.ANY);

	if (!encoder) {
		throw `Encoder method not found for object type: ${ValueType.ANY} in array encoding`;
	}

	for (const item of value) {
		encoder(state, item);
	}
}

export function initArrayEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeArray);
}
