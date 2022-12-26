/* eslint-disable no-use-before-define */
import { BufferWriter, IBufferWriter } from '@xobj/buffer';
import { ValueType } from './types';

type CustomDetectMethod = (value: any) => boolean;
type CustomEncodeMethod = (value: any, context: EncodeContext) => void;

export interface EncodeContext {
	readonly writer: IBufferWriter,
	readonly customDetect?: CustomDetectMethod,
	readonly customEncode?: CustomEncodeMethod,
}

export interface EncodeOptions {
	readonly bufferSize?: number;
	readonly customDetect?: CustomDetectMethod;
	readonly customEncode?: CustomEncodeMethod;
}

function detectType(value: any, context: EncodeContext): ValueType {
	const type = typeof value;

	switch (type) {
		case 'bigint':
			return ValueType.BIGINT;

		case 'boolean':
			return value ? ValueType.TRUE : ValueType.FALSE;

		case 'function':
			return ValueType.UNKNOWN;

		case 'number':
			if (value === Number.POSITIVE_INFINITY) {
				return ValueType.POSITIVE_INFINITY;
			}

			if (value === Number.NEGATIVE_INFINITY) {
				return ValueType.NEGATIVE_INFINITY;
			}

			if (Number.isNaN(value)) {
				return ValueType.NAN;
			}

			if (Number.isSafeInteger(value)) {
				return ValueType.INT;
			}

			return ValueType.FLOAT;

		case 'object':
			if (value === null) {
				return ValueType.NULL;
			}

			if (Array.isArray(value)) {
				return ValueType.ARRAY;
			}

			if (value instanceof RegExp) {
				return ValueType.REG_EXP;
			}

			if (value instanceof Date) {
				return ValueType.DATE;
			}

			if (value instanceof Set) {
				return ValueType.SET;
			}

			if (value instanceof Map) {
				return ValueType.MAP;
			}

			if (value instanceof ArrayBuffer) {
				return ValueType.ARRAY_BUFFER;
			}

			if (value instanceof Uint8ClampedArray) {
				return ValueType.UINT8_CLAMPED_ARRAY;
			}

			if (value instanceof Uint8Array) {
				return ValueType.UINT8_ARRAY;
			}

			if (value instanceof Uint16Array) {
				return ValueType.UINT16_ARRAY;
			}

			if (value instanceof Uint32Array) {
				return ValueType.UINT32_ARRAY;
			}

			if (value instanceof Int8Array) {
				return ValueType.INT8_ARRAY;
			}

			if (value instanceof Int16Array) {
				return ValueType.INT16_ARRAY;
			}

			if (value instanceof Int32Array) {
				return ValueType.INT32_ARRAY;
			}

			if (value instanceof Float32Array) {
				return ValueType.FLOAT32_ARRAY;
			}

			if (value instanceof Float64Array) {
				return ValueType.FLOAT64_ARRAY;
			}

			if (value instanceof DataView) {
				return ValueType.DATA_VIEW;
			}

			if (context.customDetect?.(value)) {
				return ValueType.CUSTOM;
			}

			return ValueType.OBJECT;

		case 'string':
			return ValueType.STRING;

		case 'symbol':
			return ValueType.SYMBOL;

		case 'undefined':
			return ValueType.UNDEFINED;

		default:
			return ValueType.UNKNOWN;
	}
}

function encodeArray(array: any[], context: EncodeContext) {
	const { writer } = context;

	writer.writeUintVar(array.length);

	for (const item of array) {
		encodeValue(item, context);
	}
}

function encodeValue(value: any, context: EncodeContext) {
	const type = detectType(value, context);

	const { writer } = context;

	writer.writeUintVar(type);

	switch (type) {
		case ValueType.NULL:
		case ValueType.UNDEFINED:
		case ValueType.NAN:
		case ValueType.POSITIVE_INFINITY:
		case ValueType.NEGATIVE_INFINITY:
		case ValueType.TRUE:
		case ValueType.FALSE:
			break;

		case ValueType.INT:
			writer.writeIntVar(value);
			break;

		case ValueType.FLOAT:
			writer.writeFloat64(value);
			break;

		case ValueType.BIGINT:
			writer.writeBigInt(value);
			break;

		case ValueType.STRING:
			writer.writeString(value);
			break;

		case ValueType.ARRAY:
			encodeArray(value, context);
			break;

		case ValueType.OBJECT:
			const keys = Object.keys(value);
			writer.writeUintVar(keys.length);
			for (const key of keys) {
				writer.writeString(key);
				encodeValue(value[key], context);
			}
			break;

		case ValueType.SYMBOL:
			console.warn('TODO');
			break;

		case ValueType.SET:
			const set: Set<any> = value;
			encodeArray([...set.values()], context);
			break;

		case ValueType.MAP:
			const map: Map<any, any> = value;
			encodeArray([...map.keys()], context);
			encodeArray([...map.values()], context);
			break;

		case ValueType.ARRAY_BUFFER:
			writer.writeBuffer(value);
			break;

		case ValueType.UINT8_CLAMPED_ARRAY:
		case ValueType.UINT8_ARRAY:
		case ValueType.UINT16_ARRAY:
		case ValueType.UINT32_ARRAY:
		case ValueType.INT8_ARRAY:
		case ValueType.INT16_ARRAY:
		case ValueType.INT32_ARRAY:
		case ValueType.INT_VAR_ARRAY:
		case ValueType.FLOAT32_ARRAY:
		case ValueType.FLOAT64_ARRAY:
		case ValueType.DATA_VIEW:
			const buffer: ArrayBuffer = value.buffer.slice(value.byteOffset, value.byteLength);
			writer.writeBuffer(buffer);
			break;

		case ValueType.DATE:
			writer.writeFloat64(value.getTime());
			break;

		case ValueType.REG_EXP:
			const regexp: RegExp = value;

			const data = regexp.toString();

			const pattern = data.substring(data.indexOf('/') + 1, data.lastIndexOf('/'));
			writer.writeString(pattern);

			const flags = [regexp.global, regexp.ignoreCase, regexp.multiline, regexp.sticky];
			writer.writeFlags(flags);
			break;

		case ValueType.CUSTOM:
			context.customEncode?.(value, context);
			break;

		default:
			console.warn(`Unexpected value type: ${type}`);
			break;
	}
}

export function encode(value: any, options?: EncodeOptions): ArrayBuffer {
	const bufferSize = options?.bufferSize ?? 1024;

	const writer = new BufferWriter(bufferSize);

	const context: EncodeContext = {
		writer,
		customDetect: options?.customDetect,
		customEncode: options?.customEncode,
	};

	encodeValue(value, context);

	return writer.buffer;
}
