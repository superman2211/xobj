/* istanbul ignore file */
import { ValueType } from '../types';

export function detectObject(value: any): ValueType {
	if (typeof value === 'object') {
		return ValueType.OBJECT;
	}
	return ValueType.UNKNOWN;
}
