import { DecodeContext } from '../decode';

const FLAGS = ['g', 'i', 'm', 'y'];

export function decodeRegExp(context: DecodeContext): RegExp {
	const { reader, links } = context;
	const pattern = reader.readString();
	const flags = reader.readFlags(4);
	const flagsString = flags.map((flag, i) => (flag ? FLAGS[i] : '')).join('');
	const regexp = new RegExp(pattern, flagsString);
	links.push(regexp);
	return regexp;
}
