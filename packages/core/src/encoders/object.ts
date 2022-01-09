import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function encodeObject(encoder: Encoder, value: any): boolean {
	if (typeof value !== 'object') {
		return false;
	}

	const { writer } = encoder;

	writer.writeUint8(ValueType.OBJECT);

	const keys = Object.keys(value);
	writer.writeUintVar(keys.length);

	for (const key of keys) {
		writer.writeString(key);
		encoder.writeValue(value[key]);
	}

	return true;
}
