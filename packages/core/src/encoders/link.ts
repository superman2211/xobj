import { EncodeContext } from '../encode';

export function encodeLinkIndex(value: any, context: EncodeContext): void {
	const { writer, links } = context;
	const index = links.indexOf(value);
	writer.writeUintVar(index);
}

export function encodeLinkIndexLast(value: any, context: EncodeContext): void {
	const { writer, links } = context;
	const lastIndex = links.lastIndexOf(value);
	const endIndex = links.length - lastIndex;
	writer.writeUintVar(endIndex);
}
