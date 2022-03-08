import { DetectorMethod, EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectTypedArray(state: EncodeState, value: any): ValueType {
	if (value instanceof Uint8ClampedArray) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Uint8Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Uint16Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Uint32Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Int8Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Int16Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Int32Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Float32Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof Float64Array) {
		return ValueType.TYPED_ARRAY;
	}

	if (value instanceof DataView) {
		return ValueType.TYPED_ARRAY;
	}

	return ValueType.UNKNOWN;
}

export function encodeTypedArray(state: EncodeState, value: any) {
	const { writer } = state;

	if (value instanceof Uint8ClampedArray) {
		writer.writeUint8(ValueType.UINT8);
	}

	if (value instanceof Uint8Array) {
		writer.writeUint8(ValueType.UINT8);
	}

	if (value instanceof Uint16Array) {
		writer.writeUint8(ValueType.UINT16);
	}

	if (value instanceof Uint32Array) {
		writer.writeUint8(ValueType.UINT32);
	}

	if (value instanceof Int8Array) {
		writer.writeUint8(ValueType.INT8);
	}

	if (value instanceof Int16Array) {
		writer.writeUint8(ValueType.INT16);
	}

	if (value instanceof Int32Array) {
		writer.writeUint8(ValueType.INT32);
	}

	if (value instanceof Float32Array) {
		writer.writeUint8(ValueType.FLOAT32);
	}

	if (value instanceof Float64Array) {
		writer.writeUint8(ValueType.FLOAT64);
	}

	if (value instanceof DataView) {
		writer.writeUint8(ValueType.ANY);
	}

	const buffer: ArrayBuffer = value.buffer.slice(value.byteOffset, value.byteLength);
	writer.writeBuffer(buffer);
}

export function initTypedArrayEncoders(encoders: Map<ValueType, EncoderMethod>, detectors: DetectorMethod[]) {
	encoders.set(ValueType.TYPED_ARRAY, encodeTypedArray);

	detectors.push(detectTypedArray);
}
