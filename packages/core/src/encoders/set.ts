import { EncodeContext } from '../encode';
import { encodeArrayGroups } from './array';

export function encodeSet(value: Set<any>, context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	const set: Set<any> = value;
	encodeArrayGroups([...set.values()], context);
}
