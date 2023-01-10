import { DecodeContext } from '../decode';
import { decodeArrayObject } from './array';

export function decodeMap(context: DecodeContext): Map<any, any> {
	const { links } = context;
	const map = new Map();
	links.push(map);

	const mapKeys: any[] = [];
	decodeArrayObject(mapKeys, context);

	const mapValues: any[] = [];
	decodeArrayObject(mapValues, context);

	for (let i = 0; i < mapKeys.length; i++) {
		map.set(mapKeys[i], mapValues[i]);
	}
	return map;
}
