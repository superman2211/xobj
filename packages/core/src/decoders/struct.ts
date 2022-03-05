import { ValueType, StructInfo } from '../types';
import { DecodeState } from '../decode';

export function decodeStructInfo(state: DecodeState): StructInfo {
	const { reader } = state;

	const struct = new Map<string, ValueType>();

	let count = reader.readUintVar();

	while (count--) {
		const name = reader.readString();
		const type = reader.readUint8();
		struct.set(name, type);
	}

	return struct;
}

export function decodeStruct(state: DecodeState, struct: StructInfo): any {
	const value: any = {};

	for (const property of struct) {
		const [name, type] = property;
		const decoder = state.decoders.get(type);

		if (!decoder) {
			throw `Decoder method not found for object type: ${type} in struct decoding`;
		}

		value[name] = decoder(state);
	}

	return value;
}
