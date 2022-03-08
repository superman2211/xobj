import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectString(state: EncodeState, value: any): ValueType {
	if (typeof value === 'string') {
		return ValueType.STRING;
	}

	return ValueType.UNKNOWN;
}

export function initStringEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.STRING, (state: EncodeState, value: string) => state.writer.writeString(value));

	detectors.push(detectString);
}
