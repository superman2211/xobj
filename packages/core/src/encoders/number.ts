import { Encoder } from '../Encoder';
import { ValueType } from '../ValueType';

export function detectNumber(value: number): ValueType {
	if (isNaN(value)) {
		return ValueType.NAN;
	}

	if (value === Number.POSITIVE_INFINITY) {
		return ValueType.POSITIVE_INFINITY;
	}

	if (value === Number.NEGATIVE_INFINITY) {
		return ValueType.NEGATIVE_INFINITY;
	}

	if (Number.isInteger(value)) {
		if (value >>> 8 === 0) {
			return value < 0 ? ValueType.INT8 : ValueType.UINT8;
		}
		if (value >>> 16 === 0) {
			return value < 0 ? ValueType.INT16 : ValueType.UINT16;
		}
		if (value >>> 32 === 0) {
			return value < 0 ? ValueType.INT32 : ValueType.UINT32;
		}
	}

	return ValueType.FLOAT64;
}

export function encodeNumber(encoder: Encoder, value: any): boolean {
	if (typeof value !== 'number') {
		return false;
	}
	const { writer } = encoder;

	const type = detectNumber(value);
	writer.writeUint8(type);

	switch (type) {
		case ValueType.NAN:
		case ValueType.POSITIVE_INFINITY:
		case ValueType.NEGATIVE_INFINITY:
			break;
		case ValueType.UINT8:
			writer.writeUint8(value);
			break;
		case ValueType.UINT16:
			writer.writeUint16(value);
			break;
		case ValueType.UINT32:
			writer.writeUint32(value);
			break;
		case ValueType.INT8:
			writer.writeInt8(value);
			break;
		case ValueType.INT16:
			writer.writeInt16(value);
			break;
		case ValueType.INT32:
			writer.writeInt32(value);
			break;
		default:
			writer.writeFloat64(value);
	}

	return true;
}
