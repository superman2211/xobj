import { EncodeContext } from '../encode';

export function encodeDate(value: Date, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);
	writer.writeFloat64(value.getTime());
}
