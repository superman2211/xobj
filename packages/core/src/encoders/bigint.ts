import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectBigInt(state: EncodeState, value: any): ValueType {
	if (typeof value === 'bigint') {
		return ValueType.BIGINT;
	}

	return ValueType.UNKNOWN;
}

export function initBigIntEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.BIGINT, (state: EncodeState, value: any) => state.writer.writeBigInt(value));

	detectors.push(detectBigInt);
}
