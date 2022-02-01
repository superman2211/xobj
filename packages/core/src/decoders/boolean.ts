import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function decodeBitset(state: DecodeState): boolean[] {
	const { reader } = state;
	const count = reader.readUintVar();
	return reader.readBitset(count);
}

export function initBooleanDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.FALSE, () => false);
	decoders.set(ValueType.TRUE, () => true);
	decoders.set(ValueType.BITSET, decodeBitset);
}
