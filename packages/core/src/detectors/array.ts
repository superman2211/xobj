import { ValueType } from '../types';

export function detectArray(value: any): ValueType {
	if (Array.isArray(value)) {
		return ValueType.ARRAY;
	}
	return ValueType.UNKNOWN;
}
