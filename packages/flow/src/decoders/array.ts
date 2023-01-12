import { DecodeContext } from '../decode';
import { isBooleanType, ValueType } from '../types';

export function decodeArrayGroups(array: any[], context: DecodeContext): void {
	const { reader, decoders } = context;

	let i = 0;

	while (reader.readUintVar() !== ValueType.END) {
		reader.position--;

		const type: ValueType = reader.readUintVar();
		let length = reader.readUintVar();

		if (isBooleanType(type)) {
			const bitset = reader.readBitset(length);
			let j = 0;
			while (j < length) {
				array[i++] = bitset[j++];
			}
		} else if (type === ValueType.UNDEFINED) {
			i += length;
		} else {
			const decodeMethod = decoders.get(type);
			if (!decodeMethod) {
				throw `Decoder method not found for object type: ${type} in array decoding`;
			}

			while (length--) {
				const item = decodeMethod(context);
				array[i++] = item;
			}
		}
	}
}

export function decodeArray(context: DecodeContext): Array<any> {
	const { links } = context;
	const array: any[] = [];
	links.push(array);
	decodeArrayGroups(array, context);
	return array;
}
