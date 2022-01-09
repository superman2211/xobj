import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function encodeEmpty(encoder: Encoder, value: any): boolean {
	if (typeof value === 'undefined') {
		encoder.writer.writeUint8(ValueType.UNDEFINED);
		return true;
	}

	if (value === null) {
		encoder.writer.writeUint8(ValueType.NULL);
		return true;
	}

	return false;
}
