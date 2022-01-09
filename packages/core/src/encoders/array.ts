import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function encodeArray(encoder: Encoder, value: any): boolean {
	if (!Array.isArray(value)) {
		return false;
	}

	const { writer } = encoder;

	writer.writeUint8(ValueType.ARRAY);
	writer.writeUint8(ValueType.ANY);
	writer.writeUintVar(value.length);

	for (const item of value) {
		encoder.writeValue(item);
	}

	return true;
}
