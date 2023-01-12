import { ValueType } from '../types';

export function detectNull(value: any): ValueType {
	if (value === null) {
		return ValueType.NULL;
	}
	return ValueType.UNKNOWN;
}
