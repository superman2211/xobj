import { DecodeContext } from '../decode';

export function decodeLinkIndex(context: DecodeContext): any {
	const { reader, links } = context;
	const index = reader.readUintVar();
	return links[index];
}

export function decodeLinkIndexLast(context: DecodeContext): any {
	const { reader, links } = context;
	const endIndex = reader.readUintVar();
	const lastIndex = links.length - endIndex;
	return links[lastIndex];
}
