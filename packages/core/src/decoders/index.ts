import { DecodeContext } from '../decode';
import { ValueType } from '../types';
import { decodeArray } from './array';
import { decodeArrayBuffer } from './array-buffer';
import { decodeBigint } from './bigint';
import { decodeFalse, decodeTrue } from './boolean';
import { decodeDate } from './date';
import { decodeFunction } from './function';
import { decodeLinkIndex, decodeLinkIndexLast } from './link';
import { decodeMap } from './map';
import { decodeNull } from './null';
import {
	decodeFloat,
	decodeInt,
	decodeNaN,
	decodeNegativeInfinity,
	decodePositiveInfinity,
} from './number';
import { decodeObject } from './object';
import { decodeRegExp } from './regexp';
import { decodeSet } from './set';
import { decodeString } from './string';
import { decodeSymbol } from './symbol';
import {
	decodeDataView,
	decodeFloat32Array,
	decodeFloat64Array,
	decodeInt16Array,
	decodeInt32Array,
	decodeInt8Array,
	decodeUint16Array,
	decodeUint32Array,
	decodeUint8Array,
	decodeUint8ClampedArray,
} from './typed-array';
import { decodeUndefined } from './undefined';
import { decodeValueIndex, decodeValueIndexLast } from './value';

export type DecodeMethod = (context: DecodeContext) => any;

export const DECODERS = new Map<ValueType, DecodeMethod>([
	// eslint-disable-next-line no-use-before-define
	[ValueType.ANY, decodeValue],
	[ValueType.VALUE_INDEX, decodeValueIndex],
	[ValueType.VALUE_INDEX_LAST, decodeValueIndexLast],
	[ValueType.LINK_INDEX, decodeLinkIndex],
	[ValueType.LINK_INDEX_LAST, decodeLinkIndexLast],
	[ValueType.NULL, decodeNull],
	[ValueType.UNDEFINED, decodeUndefined],
	[ValueType.TRUE, decodeTrue],
	[ValueType.FALSE, decodeFalse],
	[ValueType.NAN, decodeNaN],
	[ValueType.POSITIVE_INFINITY, decodePositiveInfinity],
	[ValueType.NEGATIVE_INFINITY, decodeNegativeInfinity],
	[ValueType.INT, decodeInt],
	[ValueType.FLOAT, decodeFloat],
	[ValueType.BIGINT, decodeBigint],
	[ValueType.STRING, decodeString],
	[ValueType.ARRAY, decodeArray],
	[ValueType.OBJECT, decodeObject],
	[ValueType.SYMBOL, decodeSymbol],
	[ValueType.FUNCTION, decodeFunction],
	[ValueType.SET, decodeSet],
	[ValueType.MAP, decodeMap],
	[ValueType.ARRAY_BUFFER, decodeArrayBuffer],
	[ValueType.UINT8_CLAMPED_ARRAY, decodeUint8ClampedArray],
	[ValueType.UINT8_ARRAY, decodeUint8Array],
	[ValueType.UINT16_ARRAY, decodeUint16Array],
	[ValueType.UINT32_ARRAY, decodeUint32Array],
	[ValueType.INT8_ARRAY, decodeInt8Array],
	[ValueType.INT16_ARRAY, decodeInt16Array],
	[ValueType.INT32_ARRAY, decodeInt32Array],
	[ValueType.FLOAT32_ARRAY, decodeFloat32Array],
	[ValueType.FLOAT64_ARRAY, decodeFloat64Array],
	[ValueType.DATA_VIEW, decodeDataView],
	[ValueType.DATE, decodeDate],
	[ValueType.REG_EXP, decodeRegExp],
]);

export function decodeValue(context: DecodeContext): any {
	const { reader, decoders } = context;

	const type: ValueType = reader.readUintVar();

	const decodeMethod = decoders.get(type);

	/* istanbul ignore next */
	if (!decodeMethod) {
		/* istanbul ignore next */
		throw `Decoder method not found for type: ${type}`;
	}

	return decodeMethod(context);
}
