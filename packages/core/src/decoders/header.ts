import { DecodeContext } from '../decode';
import { FloatQuality } from '../types';

function decodeFloatQuality(context: DecodeContext): FloatQuality {
	const { reader } = context;

	const quality = reader.readUint8();

	switch (quality) {
		case 0:
			return 'double';

		case 1:
			return 'single';

		case 2:
			return reader.readUintVar();

		default:
			throw `Unexpected float quality: ${quality}`;
	}
}

export function decodeHeader(context: DecodeContext) {
	const { reader } = context;

	const version = reader.readUintVar();
	const floatQuality = decodeFloatQuality(context);

	Object.assign(context, { version, floatQuality });
}
