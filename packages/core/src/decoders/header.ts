import { DecodeContext } from '../decode';
import { FloatType } from '../types';

function decodeFloatType(context: DecodeContext): FloatType {
	const { reader } = context;

	const type = reader.readUint8();

	switch (type) {
		case 0:
			return 'double';

		case 1:
			return 'single';

		case 2:
			return reader.readUintVar();

		default:
			throw `Unexpected float type: ${type}`;
	}
}

export function decodeHeader(context: DecodeContext) {
	const { reader } = context;

	const version = reader.readUintVar();
	const floatType = decodeFloatType(context);

	Object.assign(context, { version, floatType });
}
