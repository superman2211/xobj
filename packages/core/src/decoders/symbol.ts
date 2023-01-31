import { DecodeContext } from '../decode';

export function decodeSymbol(context: DecodeContext): symbol {
	const { links } = context;
	// eslint-disable-next-line symbol-description
	const symbol = Symbol();
	links.push(symbol);
	return symbol;
}
