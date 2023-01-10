import { EncodeContext } from '../encode';
import { ValueType } from '../types';

export function encodeLinkIndex(value: any, context: EncodeContext): boolean {
	const { writer, links } = context;
	const valueIndex = links.indexOf(value);
	const valueLastIndex = links.lastIndexOf(value);
	if (valueIndex !== -1) {
		const valueEndIndex = links.length - valueLastIndex;
		if (valueEndIndex < valueIndex) {
			writer.writeUintVar(ValueType.LINK_INDEX_LAST);
			writer.writeUintVar(valueEndIndex);
		} else {
			writer.writeUintVar(ValueType.LINK_INDEX);
			writer.writeUintVar(valueIndex);
		}
		return true;
	}
	return false;
}
