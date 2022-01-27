import { StreamReader } from '@jsbyte/stream';
import { ValueType } from '../ValueType';
import { DecodeOptions, DecoderMethod } from '../decode';

export function decodeArray(reader: StreamReader, options: DecodeOptions): Array<any> {
	const type = reader.readUint8() as ValueType;
	let count = reader.readUintVar();

	const decoder = options.decoders.get(type);

	if (!decoder) {
		throw `Decoder method not found for object type: ${type} in array decoding`;
	}

	const arrayValue = [];

	while (count-- >= 0) {
		const value = decoder(reader, options);
		arrayValue.push(value);
	}

	return arrayValue;
}

export function initArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY, decodeArray);
}
