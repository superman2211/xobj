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

	const type = ValueType.ANY;

	writer.writeUint8(type);
	writer.writeUintVar(value.length);

	const encoder = encoders.get(type);

	if (!encoder) {
		throw `Encoder method not found for object type: ${type} in array encoding`;
	}

	for (const item of value) {
		encoder(state, item);
	}
}

export function initArrayEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeArray);
}
