import { ValueType } from '../types';

export function detectString(value: any): ValueType {
	if (typeof value === 'string') {
		return ValueType.STRING;
	}
	return ValueType.UNKNOWN;
}
