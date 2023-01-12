import { ValueType } from '../types';

export function detectDate(value: any): ValueType {
	if (value instanceof Date) {
		return ValueType.DATE;
	}
	return ValueType.UNKNOWN;
}
