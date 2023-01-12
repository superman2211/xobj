import { EncodeContext } from '../encode';
import { ValueType } from '../types';

export function detectLinkIndex(value: any, context: EncodeContext): ValueType {
	const { links } = context;
	const index = links.indexOf(value);
	const lastIndex = links.lastIndexOf(value);
	if (index !== -1) {
		const endIndex = links.length - lastIndex;
		if (endIndex < index) {
			return ValueType.LINK_INDEX_LAST;
		}
		return ValueType.LINK_INDEX;
	}
	return ValueType.UNKNOWN;
}
