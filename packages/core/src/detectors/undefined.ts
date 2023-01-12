import { ValueType } from '../types';

export function detectUndefined(value: any): ValueType {
	if (value === undefined) {
		return ValueType.UNDEFINED;
	}
	return ValueType.UNKNOWN;
}
