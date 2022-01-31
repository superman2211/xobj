import { EncoderMethod, EncodeState } from '../encode';
import { isNumberType, ValueType } from '../types';

export function detectArray(state: EncodeState, value: any): ValueType {
	if (Array.isArray(value)) {
		return ValueType.ARRAY;
	}

	return ValueType.UNKNOWN;
}

export function getItemType(state: EncodeState, value: Array<any>): ValueType {
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

export function encodeArray(state: EncodeState, value: Array<any>) {
	const { writer, encoders } = state;

	const itemType = getItemType(state, value);
	const useItemType = itemType !== ValueType.ANY;

	writer.writeFlags([useItemType]);

	if (useItemType) {
		writer.writeUint8(itemType);
	}

	writer.writeUintVar(value.length);

	const encoder = encoders.get(itemType);

	if (!encoder) {
		throw `Encoder method not found for object type: ${itemType} in array encoding`;
	}

	for (const item of value) {
		encoder(state, item);
	}
}

export function initArrayEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ARRAY, encodeArray);
}
