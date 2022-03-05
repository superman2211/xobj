import { ValueType, isBooleanType } from '../types';
import { DecodeState, DecoderMethod } from '../decode';

export function decodeArray(state: DecodeState): Array<any> {
	const { reader, decoders } = state;

	const value = [];

	let groups = reader.readUintVar();

	let i = 0;

	while (groups--) {
		const type = reader.readUint8() as ValueType;
		let count = reader.readUintVar();

		if (isBooleanType(type)) {
			const bitset = reader.readBitset(count);
			let j = 0;
			while (j < count) {
				value[i++] = bitset[j++];
			}
		} else if (type === ValueType.UNDEFINED) {
			i += count;
		} else {
			const decoder = decoders.get(type);

			if (!decoder) {
				throw `Decoder method not found for object type: ${type} in array decoding`;
			}

			while (count--) {
				const item = decoder(state);
				value[i++] = item;
			}
		}
	}

	return value;
}

export function initArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY, decodeArray);
}
