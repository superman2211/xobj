import { DecoderMethod, DecodeState } from '../decode';
import { ValueType } from '../types';

export function decodeAny(state: DecodeState): any {
	const type = state.reader.readUint8() as ValueType;
	const decoder = state.decoders.get(type);

	if (!decoder) {
		throw `Decoder method not found for object type: ${type}`;
	}

	return decoder(state);
}

export function initAnyDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ANY, decodeAny);
}
