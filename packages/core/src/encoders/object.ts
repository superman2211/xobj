import { encodeValue } from './index';
import { ValueType } from '../types';
import { EncodeContext } from '../encode';

export function encodeObject(value: any, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);

	const keys = Object.getOwnPropertyNames(value);
	for (const key of keys) {
		const number = parseFloat(key);
		if (Number.isInteger(number)) {
			encodeValue(number, context);
		} else {
			encodeValue(key, context);
		}
		encodeValue(value[key], context);
	}

	const symbols = Object.getOwnPropertySymbols(value);
	for (const symbol of symbols) {
		encodeValue(symbol, context);
		encodeValue(value[symbol], context);
	}

	writer.writeUintVar(ValueType.END);
}
