import { StreamReader } from '@jsbyte/stream';
import { ValueType } from '../ValueType';
import { DecodeOptions, DecoderMethod } from '../decode';

export function decodeObject(reader: StreamReader, options: DecodeOptions): any {
	let count = reader.readUintVar();

	const decoder = options.decoders.get(ValueType.ANY);

	if (!decoder) {
		throw `Decoder method not found for object type: ${ValueType.ANY} in array decoding`;
	}

	const objectValue: any = {};

	while (count-- >= 0) {
		const key = reader.readString();
		const value = decoder(reader, options);
		objectValue[key] = value;
	}

	return objectValue;
}

export function initObjectDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.OBJECT, decodeObject);
}
