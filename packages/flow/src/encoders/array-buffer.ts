import { EncodeContext } from '../encode';

export function encodeArrayBuffer(value: ArrayBuffer, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);
	writer.writeBuffer(value);
}
