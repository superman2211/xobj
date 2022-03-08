import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectBoolean(state: EncodeState, value: any): ValueType {
	if (typeof value === 'boolean') {
		return value ? ValueType.TRUE : ValueType.FALSE;
	}

	return ValueType.UNKNOWN;
}

export function initBooleanEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.TRUE, () => { });
	encoders.set(ValueType.FALSE, () => { });

	detectors.push(detectBoolean);
}
