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
import { detectLinkIndex } from './link';
import { detectValueIndex } from './value';

export type DetectMethod = (value: any, context: EncodeContext) => ValueType;

export const DETECTORS = [
	detectValueIndex,
	detectLinkIndex,
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

export function detectValue(value: any, context: EncodeContext): ValueType {
	for (const detectMethod of context.detectors) {
		const type = detectMethod(value, context);
		if (type !== ValueType.UNKNOWN) {
			return type;
		}
	}
	/* istanbul ignore next */
	return ValueType.UNKNOWN;
}
