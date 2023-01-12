import { ValueType } from '../types';

export function detectNumber(value: any): ValueType {
	if (typeof value === 'number') {
		if (value === Number.POSITIVE_INFINITY) {
			return ValueType.POSITIVE_INFINITY;
		}

		if (value === Number.NEGATIVE_INFINITY) {
			return ValueType.NEGATIVE_INFINITY;
		}

		if (Number.isNaN(value)) {
			return ValueType.NAN;
		}

		if (Number.isInteger(value)) {
			return ValueType.INT;
		}

		return ValueType.FLOAT;
	}

	return ValueType.UNKNOWN;
}
