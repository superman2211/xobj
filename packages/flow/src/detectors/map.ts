import { ValueType } from '../types';

export function detectMap(value: any): ValueType {
	if (value instanceof Map) {
		return ValueType.MAP;
	}
	return ValueType.UNKNOWN;
}
