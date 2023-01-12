import { ValueType } from '../types';

export function detectRegExp(value: any): ValueType {
	if (value instanceof RegExp) {
		return ValueType.REG_EXP;
	}
	return ValueType.UNKNOWN;
}
