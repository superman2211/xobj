import { EncodeContext } from '../encode';

export function encodeFunction(value: Function, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);
	const code: string = value.toString();
	writer.writeString(code);
}
