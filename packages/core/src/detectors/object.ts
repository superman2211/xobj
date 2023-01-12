import { ValueType } from '../types';

export function detectObject(value: any): ValueType {
	/* istanbul ignore next */
	if (typeof value === 'object') {
		return ValueType.OBJECT;
	}
	/* istanbul ignore next */
	return ValueType.UNKNOWN;
}
