import { StreamReader } from '@jsbyte/stream';
import { ValueType } from '../ValueType';
import { DecoderMethod } from '../decode';

export function initStringDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.STRING, (reader: StreamReader) => reader.readString());
}
