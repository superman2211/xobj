import { EncodeContext } from '../encode';
import { isBooleanType, ValueType } from '../types';
import { detectValue } from '../detectors/index';

interface ArrayGroup {
	type: ValueType;
	items: any[];
}

function getGroups(value: any[], context: EncodeContext): ArrayGroup[] {
	const groups: ArrayGroup[] = [];

	if (value.length) {
		const first = value[0];
		let group: ArrayGroup = { type: detectValue(first, context), items: [first] };
		groups.push(group);

		for (let i = 1; i < value.length; i++) {
			const item = value[i];
			const type = detectValue(item, context);
			if (group.type === type) {
				group.items.push(item);
			} else if (isBooleanType(group.type) && isBooleanType(type)) {
				group.items.push(item);
			} else {
				group = { type: detectValue(item, context), items: [item] };
				groups.push(group);
			}
		}
	}

	return groups;
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

export function encodeArrayGroups(value: any[], context: EncodeContext): void {
	const { writer, encoders } = context;

	const groups = getGroups(value, context);
	optimizeGroups(groups);

	for (const group of groups) {
		writer.writeUintVar(group.type);
		writer.writeUintVar(group.items.length);

		if (isBooleanType(group.type)) {
			writer.writeBitset(group.items);
		} else {
			const encodeMethod = encoders.get(group.type);

			if (!encodeMethod) {
				throw `Encoder method not found for object type: ${group.type} in array encoding`;
			}

			for (const item of group.items) {
				encodeMethod(item, context);
			}
		}
	}

	writer.writeUintVar(ValueType.END);
}

export function encodeArray(value: any[], context: EncodeContext): void {
	const { links } = context;
	links.push(value);
	encodeArrayGroups(value, context);
}
