import { DecodeContext } from '../decode';

export function decodeNaN(): number {
	return NaN;
}

export function decodePositiveInfinity(): number {
	return Number.POSITIVE_INFINITY;
}

export function decodeNegativeInfinity(): number {
	return Number.NEGATIVE_INFINITY;
}

export function decodeInt(context: DecodeContext): number {
	const { reader, values } = context;
	const int = reader.readIntVar();
	values.push(int);
	return int;
}

export function decodeFloat(context: DecodeContext): number {
	const { reader, values } = context;
	const float = reader.readFloat64();
	values.push(float);
	return float;
}
