import { DecodeContext } from '../decode';

export function decodeString(context: DecodeContext): string {
	const { reader, values } = context;
	const string = reader.readString();
	values.push(string);
	return string;
}
