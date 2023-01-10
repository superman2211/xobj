import { EncodeContext } from '../encode';

export function encodeString(value: string, context: EncodeContext): void {
	const { writer, values } = context;
	values.push(value);
	writer.writeString(value);
}
