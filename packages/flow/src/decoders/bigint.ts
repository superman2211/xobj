import { DecodeContext } from '../decode';

export function decodeBigint(context: DecodeContext): bigint {
	const { reader, values } = context;
	const bigint = reader.readBigInt();
	values.push(bigint);
	return bigint;
}
