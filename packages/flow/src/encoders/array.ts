import { encodeValue } from './index';
import { EncodeContext } from '../encode';
import { ValueType } from '../types';

export function encodeArrayObject(array: any[], context: EncodeContext): void {
	const { writer } = context;
	for (const item of array) {
		encodeValue(item, context);
	}
	writer.writeUintVar(ValueType.END);
}

export function encodeArray(value: any[], context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	encodeArrayObject(value, context);
}
