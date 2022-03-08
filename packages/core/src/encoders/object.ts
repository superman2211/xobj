import { ValueType } from '../types';
import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';

export function detectObject(state: EncodeState, value: any): ValueType {
	if (typeof value === 'object') {
		return ValueType.OBJECT;
	}

	return ValueType.UNKNOWN;
}

export function encodeObject(state: EncodeState, value: any) {
	const { writer, encoders } = state;

	const keys = Object.keys(value);

	writer.writeUintVar(keys.length);

	const encoder = encoders.get(ValueType.ANY);

	if (!encoder) {
		throw `Encoder method not found for object type: ${ValueType.ANY} in object encoding`;
	}

	for (const key of keys) {
		writer.writeString(key);
		encoder(state, value[key]);
	}
}

export function initObjectEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.OBJECT, encodeObject);

	detectors.push(detectObject);
}
