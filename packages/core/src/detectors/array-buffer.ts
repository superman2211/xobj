import { ValueType } from '../types';

export function detectArrayBuffer(value: any): ValueType {
	if (value instanceof ArrayBuffer) {
		return ValueType.ARRAY_BUFFER;
	}
	return ValueType.UNKNOWN;
}
