import { DecodeContext } from '../decode';

export function decodeValueIndex(context: DecodeContext): any {
	const { reader, values } = context;
	const index = reader.readUintVar();
	return values[index];
}

export function decodeValueIndexLast(context: DecodeContext): any {
	const { reader, values } = context;
	const endIndex = reader.readUintVar();
	const lastIndex = values.length - endIndex;
	return values[lastIndex];
}
