import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../ValueType';

export function detectObject(state: EncodeState, value: any): ValueType {
	if (typeof value !== 'object') {
		return ValueType.OBJECT;
	}

	return ValueType.ARRAY;
}

export function encodeObject(state: EncodeState, value: any) {
	const { writer, encoders } = state;

	const keys = Object.keys(value);
	const type = ValueType.ANY;

	writer.writeUint8(type);
	writer.writeUintVar(keys.length);

	const encoder = encoders.get(type);

	if (!encoder) {
		throw `Encoder method not found for object type: ${type} in object encoding`;
	}

	for (const key of keys) {
		writer.writeString(key);
		encoder(state, value[key]);
	}
}

export function initObjectEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeObject);
}
