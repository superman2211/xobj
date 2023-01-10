import { decodeValue } from './index';
import { DecodeContext } from '../decode';
import { ValueType } from '../types';

export function decodeArrayObject(array: any[], context: DecodeContext): void {
	const { reader } = context;

	while (reader.readUintVar() !== ValueType.END) {
		reader.position--;
		const item = decodeValue(context);
		array.push(item);
	}
}

export function decodeArray(context: DecodeContext): Array<any> {
	const { links } = context;
	const array: any[] = [];
	links.push(array);
	decodeArrayObject(array, context);
	return array;
}
