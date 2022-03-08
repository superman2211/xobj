import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

export function decodeTypedArray(state: DecodeState): any {
	const { reader } = state;

	const type = reader.readUint8() as ValueType;

	const buffer = reader.readBuffer();

	switch (type) {
		case ValueType.UINT8:
			return new Uint8Array(buffer);
		case ValueType.UINT16:
			return new Uint16Array(buffer);
		case ValueType.UINT32:
			return new Uint32Array(buffer);
		case ValueType.INT8:
			return new Int8Array(buffer);
		case ValueType.INT16:
			return new Int16Array(buffer);
		case ValueType.INT32:
			return new Int32Array(buffer);
		case ValueType.FLOAT32:
			return new Float32Array(buffer);
		case ValueType.FLOAT64:
			return new Float64Array(buffer);
		default:
			throw `Unknown typed array type: ${type}`;
	}
}

export function initTypedArrayDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.TYPED_ARRAY, decodeTypedArray);
}
