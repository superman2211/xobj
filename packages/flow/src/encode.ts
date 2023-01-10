/* eslint-disable no-use-before-define */
import { BufferWriter, IBufferWriter } from '@xobj/buffer';
import { detect, DetectMethod, DETECTORS } from './detectors/index';
import { ValueType } from './types';

type EncodeMethod = (value: any, context: EncodeContext) => void;

export interface EncodeContext {
	readonly writer: IBufferWriter,
	readonly values: any[];
	readonly links: any[];
	readonly detectors: DetectMethod[];
	readonly customEncode?: EncodeMethod,
}

export interface EncodeOptions {
	readonly bufferSize?: number;
	readonly debug?: boolean;
	readonly customDetect?: DetectMethod;
	readonly customEncode?: EncodeMethod;
}

function encodeArray(array: any[], context: EncodeContext) {
	const { writer } = context;
	for (const item of array) {
		encodeValue(item, context);
	}
	writer.writeUintVar(ValueType.END);
}

function tryWriteIndex(value: any, writer: IBufferWriter, values: any[], firstType: ValueType, lastType: ValueType): boolean {
	const valueIndex = values.indexOf(value);
	const valueLastIndex = values.lastIndexOf(value);
	if (valueIndex !== -1) {
		const valueEndIndex = values.length - valueLastIndex;
		if (valueEndIndex < valueIndex) {
			writer.writeUintVar(lastType);
			writer.writeUintVar(valueEndIndex);
		} else {
			writer.writeUintVar(firstType);
			writer.writeUintVar(valueIndex);
		}
		return true;
	}
	return false;
}

function encodeValue(value: any, context: EncodeContext) {
	const type = detect(value, context);

	const { writer, values, links } = context;

	if (tryWriteIndex(value, writer, values, ValueType.VALUE_INDEX, ValueType.VALUE_INDEX_LAST)) {
		return;
	}

	if (tryWriteIndex(value, writer, links, ValueType.LINK_INDEX, ValueType.LINK_INDEX_LAST)) {
		return;
	}

	writer.writeUintVar(type);

	/* istanbul ignore next */
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
			values.push(value);
			writer.writeIntVar(value);
			break;

		case ValueType.FLOAT:
			values.push(value);
			writer.writeFloat64(value);
			break;

		case ValueType.BIGINT:
			values.push(value);
			writer.writeBigInt(value);
			break;

		case ValueType.STRING:
			values.push(value);
			writer.writeString(value);
			break;

		case ValueType.ARRAY:
			links.push(value);
			encodeArray(value, context);
			break;

		case ValueType.OBJECT:
			links.push(value);
			const keys = Object.keys(value);
			for (const key of keys) {
				const number = parseFloat(key);
				if (Number.isInteger(number)) {
					encodeValue(number, context);
				} else {
					encodeValue(key, context);
				}
				encodeValue(value[key], context);
			}
			writer.writeUintVar(ValueType.END);
			break;

		case ValueType.FUNCTION:
			links.push(value);
			const code: string = value.toString();
			writer.writeString(code);
			break;

		case ValueType.SYMBOL:
			links.push(value);
			break;

		case ValueType.SET:
			links.push(value);
			const set: Set<any> = value;
			encodeArray([...set.values()], context);
			break;

		case ValueType.MAP:
			links.push(value);
			const map: Map<any, any> = value;
			encodeArray([...map.keys()], context);
			encodeArray([...map.values()], context);
			break;

		case ValueType.ARRAY_BUFFER:
			links.push(value);
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
			links.push(value);
			const buffer: ArrayBuffer = value.buffer.slice(value.byteOffset, value.byteLength);
			writer.writeBuffer(buffer);
			break;

		case ValueType.DATE:
			links.push(value);
			writer.writeFloat64(value.getTime());
			break;

		case ValueType.REG_EXP:
			links.push(value);
			const regexp: RegExp = value;

			const data = regexp.toString();

			const pattern = data.substring(data.indexOf('/') + 1, data.lastIndexOf('/'));
			writer.writeString(pattern);

			const flags = [regexp.global, regexp.ignoreCase, regexp.multiline, regexp.sticky];
			writer.writeFlags(flags);
			break;

		case ValueType.CUSTOM:
			links.push(value);
			context.customEncode?.(value, context);
			break;

		default:
			/* istanbul ignore next */
			throw `Unexpected value type: ${type}`;
	}
}

export function encode(value: any, options?: EncodeOptions): ArrayBuffer {
	const bufferSize = options?.bufferSize ?? 1024;

	const writer = new BufferWriter(bufferSize);

	const detectors = DETECTORS.slice();

	if (options?.customDetect) {
		detectors.unshift(options.customDetect);
	}

	const context: EncodeContext = {
		writer,
		values: [],
		links: [],
		detectors,
		customEncode: options?.customEncode,
	};

	encodeValue(value, context);

	return writer.buffer;
}
