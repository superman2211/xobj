import { EncodeContext } from '../encode';
import { VERSION } from '../version';

function encodeFloatQuality(context: EncodeContext) {
	const { writer, floatQuality } = context;
	switch (floatQuality) {
		case 'double':
			writer.writeUint8(0);
			break;

		case 'single':
			writer.writeUint8(1);
			break;

		default:
			writer.writeUint8(2);
			writer.writeIntVar(floatQuality);
			break;
	}
}

export function encodeHeader(context: EncodeContext) {
	const { writer } = context;
	writer.writeUintVar(VERSION);
	encodeFloatQuality(context);
}
