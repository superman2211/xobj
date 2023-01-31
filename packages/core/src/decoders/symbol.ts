import { DecodeContext } from '../decode';

export function decodeSymbol(context: DecodeContext): symbol {
	const { links } = context;
	const symbol = Symbol(0);
	links.push(symbol);
	return symbol;
}
