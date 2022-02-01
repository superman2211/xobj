import { ValueType } from '../types';
import { DecoderMethod } from '../decode';

export function initBooleanDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.FALSE, () => false);
	decoders.set(ValueType.TRUE, () => true);
}
