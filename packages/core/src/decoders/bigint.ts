import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function initBigIntDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.BIGINT, (state: DecodeState) => state.reader.readBigInt());
}
