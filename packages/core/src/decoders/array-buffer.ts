import { DecodeContext } from '../decode';

export function decodeArrayBuffer(context: DecodeContext): ArrayBuffer {
	const { reader, links } = context;
	const buffer = reader.readBuffer();
	links.push(buffer);
	return buffer;
}
