import { DecodeContext } from '../decode';
import { decodeArrayObject } from './array';

export function decodeMap(context: DecodeContext): Map<any, any> {
	const { links } = context;
	const map = new Map();
	links.push(map);

	const mapKeys: any[] = [];
	decodeArrayObject(context, mapKeys);

	const mapValues: any[] = [];
	decodeArrayObject(context, mapValues);

	for (let i = 0; i < mapKeys.length; i++) {
		map.set(mapKeys[i], mapValues[i]);
	}
	return map;
}
