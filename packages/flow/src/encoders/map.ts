import { EncodeContext } from '../encode';
import { encodeArrayGroups } from './array';

export function encodeMap(value: Map<any, any>, context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	const map: Map<any, any> = value;
	encodeArrayGroups([...map.keys()], context);
	encodeArrayGroups([...map.values()], context);
}
