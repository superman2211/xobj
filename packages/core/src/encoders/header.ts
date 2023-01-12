import { EncodeContext } from '../encode';
import { VERSION } from '../version';

function encodeFloatType(context: EncodeContext) {
	const { writer, floatType } = context;
	switch (floatType) {
		case 'double':
			writer.writeUint8(0);
			break;

		case 'single':
			writer.writeUint8(1);
			break;

		default:
			writer.writeUint8(2);
			writer.writeIntVar(floatType);
			break;
	}
}

export function encodeHeader(context: EncodeContext) {
	const { writer } = context;
	writer.writeUintVar(VERSION);
	encodeFloatType(context);
}
