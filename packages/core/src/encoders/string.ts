import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function encodeString(encoder: Encoder, value: any): boolean {
	if (typeof value !== 'string') {
		return false;
	}

	const { writer } = encoder;
	writer.writeInt8(ValueType.STRING);
	writer.writeString(value);

	return true;
}
