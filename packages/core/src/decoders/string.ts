import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function initStringDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.STRING, (state: DecodeState) =>
		state.reader.readString()
	);
}
