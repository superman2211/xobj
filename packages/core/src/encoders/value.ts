import { EncodeContext } from '../encode';

export function encodeValueIndex(value: any, context: EncodeContext): void {
	const { writer, values } = context;
	const index = values.indexOf(value);
	writer.writeUintVar(index);
}

export function encodeValueIndexLast(value: any, context: EncodeContext): void {
	const { writer, values } = context;
	const lastIndex = values.lastIndexOf(value);
	const endIndex = values.length - lastIndex;
	writer.writeUintVar(endIndex);
}
