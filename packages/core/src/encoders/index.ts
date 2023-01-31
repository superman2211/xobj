import { detectValue } from '../detectors/index';
import { EncodeContext } from '../encode';
import { ValueType } from '../types';
import { encodeArray } from './array';
import { encodeArrayBuffer } from './array-buffer';
import { encodeBigint } from './bigint';
import { encodeFalse, encodeTrue } from './boolean';
import { encodeDate } from './date';
import { encodeFunction } from './function';
import { encodeLinkIndex, encodeLinkIndexLast } from './link';
import { encodeMap } from './map';
import { encodeNull } from './null';
import {
	encodeFloat,
	encodeInt,
	encodeNaN,
	encodeNegativeInfinity,
	encodePositiveInfinity,
} from './number';
import { encodeObject } from './object';
import { encodeRegExp } from './regexp';
import { encodeSet } from './set';
import { encodeString } from './string';
import { encodeSymbol } from './symbol';
import { encodeTypedArray } from './typed-array';
import { encodeUndefined } from './undefined';
import { encodeValueIndex, encodeValueIndexLast } from './value';

export type EncodeMethod = (value: any, context: EncodeContext) => void;

export const ENCODERS = new Map<ValueType, EncodeMethod>([
	// eslint-disable-next-line no-use-before-define
	[ValueType.ANY, encodeValue],
	[ValueType.VALUE_INDEX, encodeValueIndex],
	[ValueType.VALUE_INDEX_LAST, encodeValueIndexLast],
	[ValueType.LINK_INDEX, encodeLinkIndex],
	[ValueType.LINK_INDEX_LAST, encodeLinkIndexLast],
	[ValueType.NULL, encodeNull],
	[ValueType.UNDEFINED, encodeUndefined],
	[ValueType.TRUE, encodeTrue],
	[ValueType.FALSE, encodeFalse],
	[ValueType.NAN, encodeNaN],
	[ValueType.POSITIVE_INFINITY, encodePositiveInfinity],
	[ValueType.NEGATIVE_INFINITY, encodeNegativeInfinity],
	[ValueType.INT, encodeInt],
	[ValueType.FLOAT, encodeFloat],
	[ValueType.BIGINT, encodeBigint],
	[ValueType.STRING, encodeString],
	[ValueType.ARRAY, encodeArray],
	[ValueType.OBJECT, encodeObject],
	[ValueType.SYMBOL, encodeSymbol],
	[ValueType.FUNCTION, encodeFunction],
	[ValueType.SET, encodeSet],
	[ValueType.MAP, encodeMap],
	[ValueType.ARRAY_BUFFER, encodeArrayBuffer],
	[ValueType.UINT8_CLAMPED_ARRAY, encodeTypedArray],
	[ValueType.UINT8_ARRAY, encodeTypedArray],
	[ValueType.UINT16_ARRAY, encodeTypedArray],
	[ValueType.UINT32_ARRAY, encodeTypedArray],
	[ValueType.INT8_ARRAY, encodeTypedArray],
	[ValueType.INT16_ARRAY, encodeTypedArray],
	[ValueType.INT32_ARRAY, encodeTypedArray],
	[ValueType.FLOAT32_ARRAY, encodeTypedArray],
	[ValueType.FLOAT64_ARRAY, encodeTypedArray],
	[ValueType.DATA_VIEW, encodeTypedArray],
	[ValueType.DATE, encodeDate],
	[ValueType.REG_EXP, encodeRegExp],
]);

export function encodeValue(value: any, context: EncodeContext) {
	const { writer, encoders, replacer } = context;

	value = replacer(value);

	const type = detectValue(value, context);
	writer.writeUintVar(type);

	const encodeMethod = encoders.get(type);

	/* istanbul ignore next */
	if (!encodeMethod) {
		/* istanbul ignore next */
		throw `Encoder method not found for type: ${type}`;
	}

	encodeMethod(value, context);
}
