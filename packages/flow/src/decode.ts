/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { ValueType } from './types';

const FLAGS = ['g', 'i', 'm', 'y'];

type CustomDecodeMethod = (context: DecodeContext) => any;

export interface DecodeContext {
	readonly reader: BufferReader;
	readonly values: any[];
	readonly links: any[];
	readonly customDecode?: CustomDecodeMethod;
}

export interface DecodeOptions {
	readonly debug?: boolean;
	readonly customDecode?: CustomDecodeMethod;
}

function decodeArray(context: DecodeContext, array: any[] = []): any[] {
	const { reader } = context;

	while (reader.readUintVar() !== ValueType.END) {
		reader.position--;
		const item = decodeValue(context);
		array.push(item);
	}

	return array;
}

function decodeValue(context: DecodeContext): any {
	const { reader, values, links } = context;

	const type: ValueType = reader.readUintVar();

	switch (type) {
		case ValueType.VALUE_INDEX: {
			const index = reader.readUintVar();
			return values[index];
		}

		case ValueType.VALUE_LAST_INDEX: {
			const endIndex = reader.readUintVar();
			const lastIndex = values.length - endIndex;
			return values[lastIndex];
		}

		case ValueType.LINK_INDEX: {
			const index = reader.readUintVar();
			return links[index];
		}

		case ValueType.LINK_LAST_INDEX: {
			const endIndex = reader.readUintVar();
			const lastIndex = links.length - endIndex;
			return links[lastIndex];
		}

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
			values.push(int);
			return int;

		case ValueType.FLOAT:
			const float = reader.readFloat64();
			values.push(float);
			return float;

		case ValueType.BIGINT:
			const bigint = reader.readBigInt();
			values.push(bigint);
			return bigint;

		case ValueType.STRING:
			const string = reader.readString();
			values.push(string);
			return string;

		case ValueType.ARRAY: {
			const array: any[] = [];
			links.push(array);
			decodeArray(context, array);
			return array;
		}

		case ValueType.OBJECT: {
			const value: any = {};
			links.push(value);
			while (reader.readUintVar() !== ValueType.END) {
				reader.position--;
				const key = decodeValue(context);
				value[key] = decodeValue(context);
			}
			return value;
		}

		case ValueType.SYMBOL:
			// eslint-disable-next-line symbol-description
			const symbol = Symbol();
			links.push(symbol);
			return symbol;

		case ValueType.SET: {
			const set = new Set();
			links.push(set);

			const array = decodeArray(context);
			for (const item of array) {
				set.add(item);
			}
			return set;
		}

		case ValueType.MAP:
			const map = new Map();
			links.push(map);

			const mapKeys = decodeArray(context);
			const mapValues = decodeArray(context);
			for (let i = 0; i < mapKeys.length; i++) {
				map.set(mapKeys[i], mapValues[i]);
			}
			return map;

		case ValueType.ARRAY_BUFFER: {
			const buffer = reader.readBuffer();
			links.push(buffer);
			return buffer;
		}

		case ValueType.UINT8_CLAMPED_ARRAY: {
			const array = new Uint8ClampedArray(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.UINT8_ARRAY: {
			const array = new Uint8Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.UINT16_ARRAY: {
			const array = new Uint16Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.UINT32_ARRAY: {
			const array = new Uint32Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.INT8_ARRAY: {
			const array = new Int8Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.INT16_ARRAY: {
			const array = new Int16Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.INT32_ARRAY: {
			const array = new Int32Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.FLOAT32_ARRAY: {
			const array = new Float32Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.FLOAT64_ARRAY: {
			const array = new Float64Array(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.DATA_VIEW: {
			const array = new DataView(reader.readBuffer());
			links.push(array);
			return array;
		}

		case ValueType.DATE:
			const date = new Date(reader.readFloat64());
			links.push(date);
			return date;

		case ValueType.REG_EXP: {
			const pattern = reader.readString();
			const flags = reader.readFlags(4);
			const flagsString = flags.map((flag, i) => (flag ? FLAGS[i] : '')).join('');
			const regexp = new RegExp(pattern, flagsString);
			links.push(regexp);
			return regexp;
		}

		case ValueType.CUSTOM: {
			const value = context.customDecode?.(context);
			links.push(value);
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
		values: [],
		links: [],
		customDecode: options?.customDecode,
	};

	const value = decodeValue(context);

	return value;
}
