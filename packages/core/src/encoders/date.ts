import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectDate(state: EncodeState, value: any): ValueType {
	if (value instanceof Date) {
		return ValueType.DATE;
	}

	return ValueType.UNKNOWN;
}

export function encodeDate(state: EncodeState, value: Date) {
	const { writer } = state;
	writer.writeFloat64(value.getTime());
}

export function initDateEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.DATE, encodeDate);

	detectors.push(detectDate);
}
