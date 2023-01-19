import { EncodeContext } from '../encode';

export function encodeNaN(): void {
}

export function encodePositiveInfinity(): void {
}

export function encodeNegativeInfinity(): void {
}

export function encodeInt(value: number, context: EncodeContext): void {
	const { writer, values } = context;
	values.push(value);
	writer.writeIntVar(value);
}

export function encodeFloat(value: number, context: EncodeContext): void {
	const { writer, values, floatQuality } = context;

	values.push(value);

	switch (floatQuality) {
		case 'double':
			writer.writeFloat64(value);
			break;

		case 'single':
			writer.writeFloat32(value);
			break;

		default:
			writer.writeIntVar(Math.floor(value * floatQuality));
			break;
	}
}
