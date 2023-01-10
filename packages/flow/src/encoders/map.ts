import { EncodeContext } from '../encode';
import { encodeArrayObject } from './array';

export function encodeMap(value: Map<any, any>, context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	const map: Map<any, any> = value;
	encodeArrayObject([...map.keys()], context);
	encodeArrayObject([...map.values()], context);
}
