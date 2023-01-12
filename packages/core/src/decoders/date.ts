import { DecodeContext } from '../decode';

export function decodeDate(context: DecodeContext): Date {
	const { reader, links } = context;
	const date = new Date(reader.readFloat64());
	links.push(date);
	return date;
}
