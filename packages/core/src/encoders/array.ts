import { EncoderMethod, EncodeState } from '../encode';
import { isNumberType, ValueType } from '../types';

export function detectArray(state: EncodeState, value: any): ValueType {
	if (Array.isArray(value)) {
		return ValueType.ARRAY;
	}

	return ValueType.UNKNOWN;
}

function getItemType(state: EncodeState, value: any[]): ValueType {
	if (!value.length) {
		return ValueType.ANY;
	}

	const first = value[0];
	const firstType = state.detect(state, first);

	if (isNumberType(firstType)) {
		let isInteger = Number.isInteger(first);
		let isFloat = !Number.isInteger(first);
		let isPositive = first >= 0;
		let min: number = first;
		let max: number = first;
		let isSingle = firstType === ValueType.FLOAT32;

		for (let i = 1; i < value.length; i++) {
			const item = value[i];
			const itemType = state.detect(state, item);
			if (isNumberType(itemType)) {
				if (isInteger) {
					isInteger = Number.isInteger(item);

					if (isPositive) {
						isPositive = item >= 0;
					}

					min = Math.min(min, item);
					max = Math.max(max, item);
				}

				if (isFloat) {
					isFloat = !Number.isInteger(item);
					if (isSingle) {
						isSingle = itemType === ValueType.FLOAT32;
					}
				}
			} else {
				return ValueType.ANY;
			}
		}

		if (isInteger) {
			if (isPositive && max <= Number.MAX_SAFE_INTEGER) {
				return ValueType.UINT_VAR;
			} if (!isPositive && max >= -Number.MAX_SAFE_INTEGER) {
				return ValueType.INT_VAR;
			}
		}

		if (isFloat) {
			return isSingle ? ValueType.FLOAT32 : ValueType.FLOAT64;
		}

		return ValueType.ANY;
	}

	for (let i = 1; i < value.length; i++) {
		if (state.detect(state, value[i]) !== firstType) {
			return ValueType.ANY;
		}
	}
	return firstType;
}

function getActualArrayLength(value: any[]): number {
	let count = 0;
	for (const item of value) {
		if (item !== undefined) {
			count++;
		}
	}
	return count;
}

export function encodeArray(state: EncodeState, value: any[]) {
	const { writer, encoders } = state;

	const itemType = getItemType(state, value);
	const actualArrayLength = getActualArrayLength(value);

	const useItemType = itemType !== ValueType.ANY;
	const hasGap = actualArrayLength / value.length < 0.666;

	writer.writeFlags([useItemType, hasGap]);

	if (useItemType) {
		writer.writeUint8(itemType);
	}

	const encoder = encoders.get(itemType);

	if (!encoder) {
		throw `Encoder method not found for object type: ${itemType} in array encoding`;
	}

	if (hasGap) {
		writer.writeUintVar(actualArrayLength);

		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			if (item !== undefined) {
				writer.writeUintVar(i);
				encoder(state, item);
			}
		}
	} else {
		writer.writeUintVar(value.length);

		for (const item of value) {
			encoder(state, item);
		}
	}
}

export function initArrayEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeArray);
}
