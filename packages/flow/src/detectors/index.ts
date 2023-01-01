import { detectArrayBuffer } from './array-buffer';
import { detectArray } from './array';
import { detectBigint } from './bigint';
import { detectBoolean } from './boolean';
import { detectDate } from './date';
import { detectFunction } from './function';
import { detectMap } from './map';
import { detectNull } from './null';
import { detectNumber } from './number';
import { detectObject } from './object';
import { detectRegExp } from './regexp';
import { detectSet } from './set';
import { detectString } from './string';
import { detectSymbol } from './symbol';
import { detectTypedArray } from './typed-array';
import { detectUndefined } from './undefined';
import { ValueType } from '../types';
import { EncodeContext } from '../encode';

export type DetectMethod = (value: any) => ValueType;

export const DETECTORS = [
	detectUndefined,
	detectNull,
	detectBoolean,
	detectNumber,
	detectBigint,
	detectString,
	detectFunction,
	detectArray,
	detectArrayBuffer,
	detectTypedArray,
	detectMap,
	detectSet,
	detectDate,
	detectRegExp,
	detectSymbol,
	detectObject,
];

export function detect(value: any, context: EncodeContext): ValueType {
	for (const detectMethod of context.detectors) {
		const type = detectMethod(value);
		if (type !== ValueType.UNKNOWN) {
			return type;
		}
	}
	/* istanbul ignore next */
	return ValueType.UNKNOWN;
}
