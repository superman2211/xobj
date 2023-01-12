import { ValueType } from '../types';

export function detectSymbol(value: any): ValueType {
	if (typeof value === 'symbol') {
		return ValueType.SYMBOL;
	}
	return ValueType.UNKNOWN;
}
