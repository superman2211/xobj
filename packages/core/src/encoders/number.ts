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
		if (value < 0) {
			if (value >= -0x80) {
				return ValueType.INT8;
			}

			if (value >= -0x8000) {
				return ValueType.INT16;
			}

			if (value >= -0x8000_0000) {
				return ValueType.INT32;
			}

			if (value >= -Number.MAX_SAFE_INTEGER) {
				return ValueType.INT_VAR;
			}
		}

		if (value <= 0xff) {
			return ValueType.UINT8;
		}

		if (value <= 0xffff) {
			return ValueType.UINT16;
		}

		if (value <= 0xffff_ffff) {
			return ValueType.UINT32;
		}

		if (value <= Number.MAX_SAFE_INTEGER) {
			return ValueType.UINT_VAR;
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
		case ValueType.UINT_VAR:
			writer.writeUintVar(value);
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
		case ValueType.INT_VAR:
			writer.writeUintVar(value);
			break;
		case ValueType.FLOAT32:
			writer.writeFloat32(value);
			break;
		case ValueType.FLOAT64:
			writer.writeFloat64(value);
			break;
		default:
			writer.writeFloat64(value);
	}

	return true;
}
