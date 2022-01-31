import { ValueType } from '../types';
import { DecodeState, DecoderMethod } from '../decode';

export function decodeArray(state: DecodeState): Array<any> {
	const { reader, decoders } = state;

	let itemType = ValueType.ANY;

	const [useItemType, hasGap] = reader.readFlags(2);

	if (useItemType) {
		itemType = reader.readUint8() as ValueType;
	}

	const value = [];

	let count = reader.readUintVar();

	if (count) {
		const decoder = decoders.get(itemType);

		if (!decoder) {
			throw `Decoder method not found for object type: ${itemType} in array decoding`;
		}

		if (hasGap) {
			while (count-- > 0) {
				const index = reader.readUintVar();
				const item = decoder(state);
				value[index] = item;
			}
		} else {
			while (count-- > 0) {
				const item = decoder(state);
				value.push(item);
			}
		}
	}

	return value;
}

export function initArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ARRAY, decodeArray);
}
