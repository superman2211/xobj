import { EncodeContext } from '../encode';

export function encodeSymbol(value: symbol, context: EncodeContext): void {
	const { links } = context;
	links.push(value);
}
