import { EncoderMethod, EncodeState } from '../encode';
import { isBooleanType, isIntegerType, ValueType } from '../types';

export function detectArray(state: EncodeState, value: any): ValueType {
	if (Array.isArray(value)) {
		return ValueType.ARRAY;
	}

	return ValueType.UNKNOWN;
}

interface ArrayGroup {
	type: ValueType;
	items: any[];
}

function optimizeGroups(groups: ArrayGroup[]) {
	for (let i = 0; i < groups.length - 1; i++) {
		const j = i + 1;
		const group0 = groups[i];
		const group1 = groups[j];
		if (group0.type === ValueType.ANY || group0.items.length === 1) {
			if (group1.items.length === 1) {
				group0.type = ValueType.ANY;
				group0.items.push(...group1.items);
				groups.splice(j, 1);
				i--;
			}
		}
	}
}

function getArrayGroups(state: EncodeState, value: any[]): ArrayGroup[] {
	const groups: ArrayGroup[] = [];

	if (value.length) {
		const first = value[0];
		let group: ArrayGroup = { type: state.detect(state, first), items: [first] };
		groups.push(group);

		for (let i = 1; i < value.length; i++) {
			const item = value[i];
			const type = state.detect(state, item);
			if (group.type === type) {
				group.items.push(item);
			} else if (isBooleanType(group.type) && isBooleanType(type)) {
				group.items.push(item);
			} else if (isIntegerType(group.type) && isIntegerType(type)) {
				group.type = ValueType.INT_VAR;
				group.items.push(item);
			} else {
				group = { type: state.detect(state, item), items: [item] };
				groups.push(group);
			}
		}

		optimizeGroups(groups);
	}

	return groups;
}

export function encodeArray(state: EncodeState, value: any[]) {
	const { writer, encoders } = state;

	const groups = getArrayGroups(state, value);

	writer.writeUintVar(groups.length);
	for (const group of groups) {
		writer.writeUint8(group.type);
		writer.writeUintVar(group.items.length);

		if (isBooleanType(group.type)) {
			writer.writeBitset(group.items);
		} else {
			const encoder = encoders.get(group.type);

			if (!encoder) {
				throw `Encoder method not found for object type: ${group.type} in array encoding`;
			}

			for (const item of group.items) {
				encoder(state, item);
			}
		}
	}
}

export function initArrayEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeArray);
}
