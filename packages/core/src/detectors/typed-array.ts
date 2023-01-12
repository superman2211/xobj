import { ValueType } from '../types';

export function detectTypedArray(value: any): ValueType {
	if (typeof value === 'object') {
		if (value instanceof Uint8ClampedArray) {
			return ValueType.UINT8_CLAMPED_ARRAY;
		}

		if (value instanceof Uint8Array) {
			return ValueType.UINT8_ARRAY;
		}

		if (value instanceof Uint16Array) {
			return ValueType.UINT16_ARRAY;
		}

		if (value instanceof Uint32Array) {
			return ValueType.UINT32_ARRAY;
		}

		if (value instanceof Int8Array) {
			return ValueType.INT8_ARRAY;
		}

		if (value instanceof Int16Array) {
			return ValueType.INT16_ARRAY;
		}

		if (value instanceof Int32Array) {
			return ValueType.INT32_ARRAY;
		}

		if (value instanceof Float32Array) {
			return ValueType.FLOAT32_ARRAY;
		}

		if (value instanceof Float64Array) {
			return ValueType.FLOAT64_ARRAY;
		}

		if (value instanceof DataView) {
			return ValueType.DATA_VIEW;
		}
	}
	return ValueType.UNKNOWN;
}
