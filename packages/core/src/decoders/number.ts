import { StreamReader } from '@jsbyte/stream';
import { ValueType } from '../ValueType';
import { DecoderMethod } from '../decode';

export function initNumberDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.NAN, () => NaN);
	decoders.set(ValueType.POSITIVE_INFINITY, () => Number.POSITIVE_INFINITY);
	decoders.set(ValueType.NEGATIVE_INFINITY, () => Number.NEGATIVE_INFINITY);

	decoders.set(ValueType.UINT8, (reader: StreamReader) => reader.readUint8());
	decoders.set(ValueType.UINT16, (reader: StreamReader) => reader.readUint16());
	decoders.set(ValueType.UINT32, (reader: StreamReader) => reader.readUint32());
	decoders.set(ValueType.UINT_VAR, (reader: StreamReader) => reader.readUintVar());

	decoders.set(ValueType.INT8, (reader: StreamReader) => reader.readInt8());
	decoders.set(ValueType.INT16, (reader: StreamReader) => reader.readInt16());
	decoders.set(ValueType.INT32, (reader: StreamReader) => reader.readInt32());
	decoders.set(ValueType.INT_VAR, (reader: StreamReader) => reader.readIntVar());

	decoders.set(ValueType.FLOAT32, (reader: StreamReader) => reader.readFloat32());
	decoders.set(ValueType.FLOAT64, (reader: StreamReader) => reader.readFloat64());
}
