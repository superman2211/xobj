import { ValueType } from '../types';
import { DecoderMethod } from '../decode';

export function initEmptyDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.UNDEFINED, () => undefined);
	decoders.set(ValueType.NULL, () => null);
}
