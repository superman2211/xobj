import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function decodeDate(state: DecodeState): any {
	const { reader } = state;
	return new Date(reader.readFloat64());
}

export function initDateDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.DATE, decodeDate);
}
