import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectArrayBuffer(state: EncodeState, value: any): ValueType {
	if (value instanceof ArrayBuffer) {
		return ValueType.ARRAY_BUFFER;
	}

	return ValueType.UNKNOWN;
}

export function encodeArrayBuffer(state: EncodeState, value: ArrayBuffer) {
	const { writer } = state;
	writer.writeBuffer(value);
}

export function initArrayBufferEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.ARRAY_BUFFER, encodeArrayBuffer);

	detectors.push(detectArrayBuffer);
}
