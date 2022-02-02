/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

function checkInteger(value: number, length: number) {
	const writer = new BufferWriter();
	writer.writeFloatVar(value);
	expect(writer.length).toBe(length);

	const reader = new BufferReader(writer.buffer);
	expect(reader.readFloatVar()).toBe(value);
}

function checkFloat(value: number, numDigits: number, length: number) {
	const writer = new BufferWriter();
	writer.writeFloatVar(value);
	expect(writer.length).toBe(length);

	const reader = new BufferReader(writer.buffer);
	expect(reader.readFloatVar()).toBeCloseTo(value, numDigits);
}

describe('basic types', () => {
	it('should write integer to variable float point number', () => {
		checkInteger(123, 3);
		checkInteger(-1000, 3);
		checkInteger(78901, 4);
		checkInteger(245, 3);
		checkInteger(2048, 3);
		checkInteger(0xabcdef, 5);
		checkInteger(2374210000000000, 9);
	});

	it('should write variable float point number', () => {
		checkFloat(123.456, 3, 4);
		checkFloat(-1234.56789, 5, 5);
		checkFloat(0.00012345, 8, 4);
		checkFloat(0.00000012345, 11, 4);
		checkFloat(-0.00000000000012345, 17, 4);
		checkFloat(237421000000.3456, 4, 9);
		checkFloat(-1234567.0123456789, 10, 9);
	});
});
