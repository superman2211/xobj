import { ValueType } from '../types';

export function detectFunction(value: any): ValueType {
	if (typeof value === 'function') {
		return ValueType.FUNCTION;
	}
	return ValueType.UNKNOWN;
}
