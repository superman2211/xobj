import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function decodeArrayBuffer(state: DecodeState): any {
	const { reader } = state;
	const value = reader.readBuffer();
	return value;
}

export function initArrayBufferDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY_BUFFER, decodeArrayBuffer);
}
