import { EncoderMethod } from '..';
import { EncodeState } from '../encode';
import { ValueType } from '../types';

export function detectNumber(state: EncodeState, value: number): ValueType {
	if (typeof value !== 'number') {
		return ValueType.UNKNOWN;
	}

	if (isNaN(value)) {
		return ValueType.NAN;
	}

	if (value === Number.POSITIVE_INFINITY) {
		return ValueType.POSITIVE_INFINITY;
	}

	if (value === Number.NEGATIVE_INFINITY) {
		return ValueType.NEGATIVE_INFINITY;
	}

	if (Number.isInteger(value)) {
		if (value < 0) {
			if (value >= -0x80) {
				return ValueType.INT8;
			}

			if (value >= -0x8000) {
				return ValueType.INT16;
			}

			if (value >= -0x8000_0000) {
				return ValueType.INT32;
			}

			if (value >= -Number.MAX_SAFE_INTEGER) {
				return ValueType.INT_VAR;
			}
		}

		if (value <= 0xff) {
			return ValueType.UINT8;
		}

		if (value <= 0xffff) {
			return ValueType.UINT16;
		}

		if (value <= 0xffff_ffff) {
			return ValueType.UINT32;
		}

		if (value <= Number.MAX_SAFE_INTEGER) {
			return ValueType.UINT_VAR;
		}
	} else {
		const parts = value.toString(10).split('.');
		if (parts.length === 2 && parts[1].length < 7) {
			return ValueType.FLOAT32;
		}
	}

	return ValueType.FLOAT64;
}

export function initNumberEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.NAN, () => {});
	encoders.set(ValueType.POSITIVE_INFINITY, () => {});
	encoders.set(ValueType.NEGATIVE_INFINITY, () => {});

	encoders.set(ValueType.UINT8, (state: EncodeState, value: number) =>
		state.writer.writeUint8(value)
	);
	encoders.set(ValueType.UINT16, (state: EncodeState, value: number) =>
		state.writer.writeUint16(value)
	);
	encoders.set(ValueType.UINT32, (state: EncodeState, value: number) =>
		state.writer.writeUint32(value)
	);
	encoders.set(ValueType.UINT_VAR, (state: EncodeState, value: number) =>
		state.writer.writeUintVar(value)
	);

	encoders.set(ValueType.INT8, (state: EncodeState, value: number) =>
		state.writer.writeInt8(value)
	);
	encoders.set(ValueType.INT16, (state: EncodeState, value: number) =>
		state.writer.writeInt16(value)
	);
	encoders.set(ValueType.INT32, (state: EncodeState, value: number) =>
		state.writer.writeInt32(value)
	);
	encoders.set(ValueType.INT_VAR, (state: EncodeState, value: number) =>
		state.writer.writeIntVar(value)
	);

	encoders.set(ValueType.FLOAT32, (state: EncodeState, value: number) =>
		state.writer.writeFloat32(value)
	);
	encoders.set(ValueType.FLOAT64, (state: EncodeState, value: number) =>
		state.writer.writeFloat64(value)
	);
}
