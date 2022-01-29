import { ValueType } from '../types';
import { DecodeState, DecoderMethod } from '../decode';

export function decodeObject(state: DecodeState): any {
	const { reader, decoders } = state;

	let count = reader.readUintVar();

	const decoder = decoders.get(ValueType.ANY);

	if (!decoder) {
		throw `Decoder method not found for object type: ${ValueType.ANY} in array decoding`;
	}

	const objectValue: any = {};

	while (count-- > 0) {
		const key = reader.readString();
		const value = decoder(state);
		objectValue[key] = value;
	}

	return objectValue;
}

export function initObjectDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.OBJECT, decodeObject);
}
