import { StructInfo, ValueType } from '../types';
import { EncodeState } from '../encode';

function getStruct(state: EncodeState, value: any): StructInfo | undefined {
	const struct = new Map<string, ValueType>();

	const keys = Object.keys(value);
	for (const key of keys) {
		const type = state.detect(state, value[key]);
		if (type === ValueType.OBJECT) {
			return undefined;
		}
		struct.set(key, type);
	}

	return struct;
}

function structsEqual(struct0: StructInfo, struct1: StructInfo): boolean {
	if (struct0.size !== struct1.size) {
		return false;
	}
	for (const key in struct0.keys()) {
		if (struct0.get(key) !== struct1.get(key)) {
			return false;
		}
	}
	return true;
}

export function getItemsStruct(state: EncodeState, items: object[]): StructInfo | undefined {
	const groupStruct = getStruct(state, items[0]);
	if (groupStruct) {
		for (let i = 1; i < items.length; i++) {
			const itemStruct = getStruct(state, items[i]);
			if (!itemStruct || !structsEqual(groupStruct, itemStruct)) {
				return undefined;
			}
		}
	}
	return groupStruct;
}

export function encodeStructInfo(state: EncodeState, struct: StructInfo) {
	const { writer } = state;

	writer.writeUintVar(struct.size);

	for (const property of struct) {
		const [name, type] = property;
		writer.writeString(name);
		writer.writeUint8(type);
	}
}

export function encodeStruct(state: EncodeState, struct: StructInfo, value: any) {
	const { encoders } = state;

	for (const property of struct) {
		const [name, type] = property;
		const encoder = encoders.get(type);

		if (!encoder) {
			throw `Encoder method not found for object type: ${type} in struct encoding`;
		}

		encoder(state, value[name]);
	}
}
