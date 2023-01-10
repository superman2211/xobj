import { decodeValue } from './index';
import { DecodeContext } from '../decode';
import { ValueType } from '../types';

export function decodeArrayObject(context: DecodeContext, array: any[]): void {
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
	decodeArrayObject(context, array);
	return array;
}
