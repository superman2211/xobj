/* eslint-disable no-undef */

import { isFloatType, isNumberType, ValueType } from '../src';

describe('types', () => {
	it('should check number type', () => {
		expect(isNumberType(ValueType.INT8)).toBeTruthy();
		expect(isNumberType(ValueType.INT16)).toBeTruthy();
		expect(isNumberType(ValueType.INT32)).toBeTruthy();
		expect(isNumberType(ValueType.INT_VAR)).toBeTruthy();

		expect(isNumberType(ValueType.UINT8)).toBeTruthy();
		expect(isNumberType(ValueType.UINT16)).toBeTruthy();
		expect(isNumberType(ValueType.UINT32)).toBeTruthy();
		expect(isNumberType(ValueType.UINT_VAR)).toBeTruthy();

		expect(isNumberType(ValueType.FLOAT32)).toBeTruthy();
		expect(isNumberType(ValueType.FLOAT64)).toBeTruthy();

		expect(isNumberType(ValueType.STRING)).toBeFalsy();
		expect(isNumberType(ValueType.TRUE)).toBeFalsy();
	});

	it('should check float type', () => {
		expect(isFloatType(ValueType.INT8)).toBeFalsy();
		expect(isFloatType(ValueType.FLOAT32)).toBeTruthy();
		expect(isFloatType(ValueType.FLOAT64)).toBeTruthy();
	});
});
