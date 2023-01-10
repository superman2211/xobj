import { decodeValue } from './index';
import { ValueType } from '../types';
import { DecodeContext } from '../decode';

export function decodeObject(context: DecodeContext): any {
	const { reader, links } = context;
	const value: any = {};
	links.push(value);
	while (reader.readUintVar() !== ValueType.END) {
		reader.position--;
		const key = decodeValue(context);
		value[key] = decodeValue(context);
	}
	return value;
}
