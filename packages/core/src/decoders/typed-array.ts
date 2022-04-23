import { ValueType, TypedArrayType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function decodeTypedArray(state: DecodeState): any {
	const { reader } = state;

	const type = reader.readUint8() as TypedArrayType;

	const buffer = reader.readBuffer();

	switch (type) {
		case TypedArrayType.UINT8_CLAMPED:
			return new Uint8ClampedArray(buffer);
		case TypedArrayType.UINT8:
			return new Uint8Array(buffer);
		case TypedArrayType.UINT16:
			return new Uint16Array(buffer);
		case TypedArrayType.UINT32:
			return new Uint32Array(buffer);
		case TypedArrayType.INT8:
			return new Int8Array(buffer);
		case TypedArrayType.INT16:
			return new Int16Array(buffer);
		case TypedArrayType.INT32:
			return new Int32Array(buffer);
		case TypedArrayType.FLOAT32:
			return new Float32Array(buffer);
		case TypedArrayType.FLOAT64:
			return new Float64Array(buffer);
		case TypedArrayType.DATA_VIEW:
			return new DataView(buffer);
		default:
			throw `Unknown typed array type: ${type}`;
	}
}

export function initTypedArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.TYPED_ARRAY, decodeTypedArray);
}
