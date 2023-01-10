import { DecodeContext } from '../decode';

export function decodeFunction(context: DecodeContext): Function {
	const { reader, links } = context;
	let code = reader.readString();
	if (code.indexOf('function') === -1) {
		code = `function ${code}`;
	}
	// eslint-disable-next-line no-eval
	const func = eval(`(${code})`);
	links.push(func);
	return func;
}
