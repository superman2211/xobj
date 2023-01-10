import { EncodeContext } from '../encode';
import { encodeArrayObject } from './array';

export function encodeSet(value: Set<any>, context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	const set: Set<any> = value;
	encodeArrayObject([...set.values()], context);
}
