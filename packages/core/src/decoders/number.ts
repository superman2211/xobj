import { ValueType } from '../ValueType';
import { DecoderMethod, DecodeState } from '../decode';

export function initNumberDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.NAN, () => NaN);
	decoders.set(ValueType.POSITIVE_INFINITY, () => Number.POSITIVE_INFINITY);
	decoders.set(ValueType.NEGATIVE_INFINITY, () => Number.NEGATIVE_INFINITY);

	decoders.set(ValueType.UINT8, (state: DecodeState) => state.reader.readUint8());
	decoders.set(ValueType.UINT16, (state: DecodeState) => state.reader.readUint16());
	decoders.set(ValueType.UINT32, (state: DecodeState) => state.reader.readUint32());
	decoders.set(ValueType.UINT_VAR, (state: DecodeState) => state.reader.readUintVar());

	decoders.set(ValueType.INT8, (state: DecodeState) => state.reader.readInt8());
	decoders.set(ValueType.INT16, (state: DecodeState) => state.reader.readInt16());
	decoders.set(ValueType.INT32, (state: DecodeState) => state.reader.readInt32());
	decoders.set(ValueType.INT_VAR, (state: DecodeState) => state.reader.readIntVar());

	decoders.set(ValueType.FLOAT32, (state: DecodeState) => state.reader.readFloat32());
	decoders.set(ValueType.FLOAT64, (state: DecodeState) => state.reader.readFloat64());
}
