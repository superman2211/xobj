/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { ValueType } from './types';

const FLAGS = ['g', 'i', 'm', 'y'];

type CustomDecodeMethod = (context: DecodeContext) => any;

export interface DecodeContext {
	readonly reader: BufferReader;
	readonly cache: any[];
	readonly customDecode?: CustomDecodeMethod;
}

export interface DecodeOptions {
	readonly debug?: boolean;
	readonly customDecode?: CustomDecodeMethod;
}

function decodeArray(context: DecodeContext): any[] {
	const { reader } = context;

	const array: any[] = [];

	while (true) {
		const type = reader.readUintVar();
		if (type !== ValueType.END) {
			reader.position--;
			const item = decodeValue(context);
			array.push(item);
		} else {
			break;
		}
	}

	return array;
}

function decodeValue(context: DecodeContext): any {
	const { reader, cache } = context;

	const type: ValueType = reader.readUintVar();

	switch (type) {
		case ValueType.INDEX:
			const index = reader.readUintVar();
			// console.log('decode index', index, cache[index]);
			return cache[index];

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
			const int = reader.readIntVar();
			cache.push(int);
			return int;

		case ValueType.FLOAT:
			const float = reader.readFloat64();
			cache.push(float);
			return float;

		case ValueType.BIGINT:
			const bigint = reader.readBigInt();
			cache.push(bigint);
			return bigint;

		case ValueType.STRING:
			const string = reader.readString();
			cache.push(string);
			return string;

		case ValueType.ARRAY: {
			const array = decodeArray(context);
			return array;
		}

		case ValueType.OBJECT: {
			const value: any = {};
			while (true) {
				const end = reader.readUintVar();
				if (end === ValueType.END) {
					break;
				}
				reader.position--;
				const key = decodeValue(context);
				value[key] = decodeValue(context);
			}
			return value;
		}

		case ValueType.SYMBOL:
			console.warn('TODO');
			return undefined;

		case ValueType.SET: {
			const array = decodeArray(context);
			const set = new Set(array);
			return set;
		}

		case ValueType.MAP:
			const keys = decodeArray(context);
			const values = decodeArray(context);

			const map = new Map();
			for (let i = 0; i < keys.length; i++) {
				map.set(keys[i], values[i]);
			}
			return map;

		case ValueType.ARRAY_BUFFER: {
			const buffer = reader.readBuffer();
			return buffer;
		}

		case ValueType.UINT8_CLAMPED_ARRAY: {
			const array = new Uint8ClampedArray(reader.readBuffer());
			return array;
		}

		case ValueType.UINT8_ARRAY: {
			const array = new Uint8Array(reader.readBuffer());
			return array;
		}

		case ValueType.UINT16_ARRAY: {
			const array = new Uint16Array(reader.readBuffer());
			return array;
		}

		case ValueType.UINT32_ARRAY: {
			const array = new Uint32Array(reader.readBuffer());
			return array;
		}

		case ValueType.INT8_ARRAY: {
			const array = new Int8Array(reader.readBuffer());
			return array;
		}

		case ValueType.INT16_ARRAY: {
			const array = new Int16Array(reader.readBuffer());
			return array;
		}

		case ValueType.INT32_ARRAY: {
			const array = new Int32Array(reader.readBuffer());
			return array;
		}

		case ValueType.FLOAT32_ARRAY: {
			const array = new Float32Array(reader.readBuffer());
			return array;
		}

		case ValueType.FLOAT64_ARRAY: {
			const array = new Float64Array(reader.readBuffer());
			return array;
		}

		case ValueType.DATA_VIEW: {
			const array = new DataView(reader.readBuffer());
			return array;
		}

		case ValueType.DATE:
			const date = new Date(reader.readFloat64());
			return date;

		case ValueType.REG_EXP: {
			const pattern = reader.readString();
			const flags = reader.readFlags(4);
			const flagsString = flags.map((flag, i) => (flag ? FLAGS[i] : '')).join('');
			const regexp = new RegExp(pattern, flagsString);
			return regexp;
		}

		case ValueType.CUSTOM: {
			const value = context.customDecode?.(context);
			return value;
		}

		default:
			console.warn(`Unexpected value type: ${type}`);
			return undefined;
	}
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new BufferReader(buffer);

	const context: DecodeContext = {
		reader,
		cache: [],
		customDecode: options?.customDecode,
	};

	const value = decodeValue(context);

	if (options?.debug) {
		console.log('decode cache', context.cache);
	}

	return value;
}
