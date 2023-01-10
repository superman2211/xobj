import { EncodeContext } from '../encode';

export function encodeBigint(value: bigint, context: EncodeContext): void {
	const { writer, values } = context;
	values.push(value);
	writer.writeBigInt(value);
}
