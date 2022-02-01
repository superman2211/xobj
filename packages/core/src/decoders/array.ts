import { ValueType } from '../types';
import { DecodeState, DecoderMethod } from '../decode';
import { isBooleanType } from '..';

export function decodeArray2(state: DecodeState): Array<any> {
	const { reader, decoders } = state;

	const value = [];

	let groups = reader.readUintVar();

	while (groups--) {
		const type = reader.readUint8() as ValueType;
		let count = reader.readUintVar();

		if (isBooleanType(type)) {
			const bitset = reader.readBitset(count);
			value.push(...bitset);
		} else {
			const decoder = decoders.get(type);

			if (!decoder) {
				throw `Decoder method not found for object type: ${type} in array decoding`;
			}

			while (count--) {
				const item = decoder(state);
				value.push(item);
			}
		}
	}

	return value;
}

export function initArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY, decodeArray2);
}
