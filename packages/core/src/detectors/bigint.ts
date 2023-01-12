import { ValueType } from '../types';

export function detectBigint(value: any): ValueType {
	if (typeof value === 'bigint') {
		return ValueType.BIGINT;
	}
	return ValueType.UNKNOWN;
}
