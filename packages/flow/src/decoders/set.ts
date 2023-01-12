import { DecodeContext } from '../decode';
import { decodeArrayGroups } from './array';

export function decodeSet(context: DecodeContext): Set<any> {
	const { links } = context;
	const set = new Set();
	links.push(set);

	const array: any[] = [];
	decodeArrayGroups(array, context);

	for (const item of array) {
		set.add(item);
	}
	return set;
}
