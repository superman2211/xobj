import { ValueType } from '../types';

export function detectSet(value: any): ValueType {
	if (value instanceof Set) {
		return ValueType.SET;
	}
	return ValueType.UNKNOWN;
}
