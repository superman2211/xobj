import { EncodeContext } from '../encode';
import { ValueType } from '../types';

export function detectValueIndex(value: any, context: EncodeContext): ValueType {
	const { values } = context;
	const index = values.indexOf(value);
	const lastIndex = values.lastIndexOf(value);
	if (index !== -1) {
		const endIndex = values.length - lastIndex;
		if (endIndex < index) {
			return ValueType.VALUE_INDEX_LAST;
		}
		return ValueType.VALUE_INDEX;
	}
	return ValueType.UNKNOWN;
}
