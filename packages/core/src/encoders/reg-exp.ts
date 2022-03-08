import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectRegExp(state: EncodeState, value: any): ValueType {
	if (value instanceof RegExp) {
		return ValueType.REG_EXP;
	}

	return ValueType.UNKNOWN;
}

export function encodeRegExp(state: EncodeState, value: RegExp) {
	const { writer } = state;

	const data = value.toString();
	const pattern = data.substring(data.indexOf('/') + 1, data.lastIndexOf('/'));
	writer.writeString(pattern);

	const flags = [value.global, value.ignoreCase, value.multiline, value.sticky];
	writer.writeFlags(flags);
}

export function initRegExpEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.REG_EXP, encodeRegExp);

	detectors.push(detectRegExp);
}
