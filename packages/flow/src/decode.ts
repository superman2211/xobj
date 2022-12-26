/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { ValueType } from './types';

const FLAGS = ['g', 'i', 'm', 'y'];

type CustomDecodeMethod = (context: DecodeContext) => any;

export interface DecodeContext {
	readonly reader: BufferReader;
	readonly customDecode?: CustomDecodeMethod;
}

export interface DecodeOptions {
	readonly customDecode?: CustomDecodeMethod;
}

function decodeArray(context: DecodeContext): any[] {
	const { reader } = context;

	const array: any[] = [];

	let count = reader.readUintVar();

	while (count--) {
		const item = decodeValue(context);
		array.push(item);
	}

	return array;
}

function decodeValue(context: DecodeContext): any {
	const { reader } = context;

	const type: ValueType = reader.readUintVar();

	switch (type) {
		case ValueType.NULL:
			return null;

		case ValueType.UNDEFINED:
			return undefined;

		case ValueType.NAN:
			return NaN;

		case ValueType.POSITIVE_INFINITY:
			return Number.POSITIVE_INFINITY;

		case ValueType.NEGATIVE_INFINITY:
			return Number.NEGATIVE_INFINITY;

		case ValueType.TRUE:
			return true;

		case ValueType.FALSE:
			return false;

		case ValueType.INT:
			return reader.readIntVar();

		case ValueType.FLOAT:
			return reader.readFloat64();

		case ValueType.BIGINT:
			return reader.readBigInt();

		case ValueType.STRING:
			return reader.readString();

		case ValueType.ARRAY:
			return decodeArray(context);

		case ValueType.OBJECT:
			const value: any = {};
			let keysLength = reader.readUintVar();
			while (keysLength--) {
				const key = reader.readString();
				value[key] = decodeValue(context);
			}
			return value;

		case ValueType.SYMBOL:
			console.warn('TODO');
			return undefined;

		case ValueType.SET:
			const array = decodeArray(context);
			return new Set(array);

		case ValueType.MAP:
			const keys = decodeArray(context);
			const values = decodeArray(context);

			const map = new Map();
			for (let i = 0; i < keys.length; i++) {
				map.set(keys[i], values[i]);
			}
			return map;

		case ValueType.ARRAY_BUFFER:
			return reader.readBuffer();

		case ValueType.UINT8_CLAMPED_ARRAY:
			return new Uint8ClampedArray(reader.readBuffer());

		case ValueType.UINT8_ARRAY:
			return new Uint8Array(reader.readBuffer());

		case ValueType.UINT16_ARRAY:
			return new Uint16Array(reader.readBuffer());

		case ValueType.UINT32_ARRAY:
			return new Uint32Array(reader.readBuffer());

		case ValueType.INT8_ARRAY:
			return new Int8Array(reader.readBuffer());

		case ValueType.INT16_ARRAY:
			return new Int16Array(reader.readBuffer());

		case ValueType.INT32_ARRAY:
			return new Int32Array(reader.readBuffer());

		case ValueType.FLOAT32_ARRAY:
			return new Float32Array(reader.readBuffer());

		case ValueType.FLOAT64_ARRAY:
			return new Float64Array(reader.readBuffer());

		case ValueType.DATA_VIEW:
			return new DataView(reader.readBuffer());

		case ValueType.DATE:
			return new Date(reader.readFloat64());

		case ValueType.REG_EXP:
			const pattern = reader.readString();
			const flags = reader.readFlags(4);
			const flagsString = flags.map((flag, index) => (flag ? FLAGS[index] : '')).join('');
			return new RegExp(pattern, flagsString);

		case ValueType.CUSTOM:
			return context.customDecode?.(context);

		default:
			console.warn(`Unexpected value type: ${type}`);
			return undefined;
	}
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new BufferReader(buffer);

	const context: DecodeContext = {
		reader,
		customDecode: options?.customDecode,
	};

	const value = decodeValue(context);

	return value;
}
