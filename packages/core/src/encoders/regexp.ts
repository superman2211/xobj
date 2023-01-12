import { EncodeContext } from '../encode';

export function encodeRegExp(value: RegExp, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);
	const regexp: RegExp = value;

	const data = regexp.toString();

	const pattern = data.substring(data.indexOf('/') + 1, data.lastIndexOf('/'));
	writer.writeString(pattern);

	const flags = [regexp.global, regexp.ignoreCase, regexp.multiline, regexp.sticky];
	writer.writeFlags(flags);
}
