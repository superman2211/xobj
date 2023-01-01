import { ValueType } from '../types';

export function detectBoolean(value: any): ValueType {
	if (value === true) {
		return ValueType.TRUE;
	}
	if (value === false) {
		return ValueType.FALSE;
	}
	return ValueType.UNKNOWN;
}
