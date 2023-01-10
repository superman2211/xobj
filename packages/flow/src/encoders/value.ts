import { EncodeContext } from '../encode';
import { ValueType } from '../types';

export function encodeValueIndex(value: any, context: EncodeContext): boolean {
	const { writer, values } = context;
	const valueIndex = values.indexOf(value);
	const valueLastIndex = values.lastIndexOf(value);
	if (valueIndex !== -1) {
		const valueEndIndex = values.length - valueLastIndex;
		if (valueEndIndex < valueIndex) {
			writer.writeUintVar(ValueType.VALUE_INDEX_LAST);
			writer.writeUintVar(valueEndIndex);
		} else {
			writer.writeUintVar(ValueType.VALUE_INDEX);
			writer.writeUintVar(valueIndex);
		}
		return true;
	}
	return false;
}
