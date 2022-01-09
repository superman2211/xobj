import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function encodeBoolean(encoder: Encoder, value: any): boolean {
	if (typeof value !== 'boolean') {
		return false;
	}

	encoder.writer.writeUint8(value ? ValueType.TRUE : ValueType.FALSE);
	return true;
}
