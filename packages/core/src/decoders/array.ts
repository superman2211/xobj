import { ValueType } from '../types';
import { DecodeState, DecoderMethod } from '../decode';

export function decodeArray(state: DecodeState): Array<any> {
	const { reader, decoders } = state;

	const type = reader.readUint8() as ValueType;
	let count = reader.readUintVar();

	const decoder = decoders.get(type);

	if (!decoder) {
		throw `Decoder method not found for object type: ${type} in array decoding`;
	}

	const arrayValue = [];

	while (count-- > 0) {
		const value = decoder(state);
		arrayValue.push(value);
	}

	return arrayValue;
}

export function initArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY, decodeArray);
}
