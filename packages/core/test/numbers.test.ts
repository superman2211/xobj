/* eslint-disable no-undef */

import { decode } from '../src';
import { encode } from '../src/encode';

describe('const values', () => {
	it('should write NaN', () => {
		const source = NaN;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write positive infinity', () => {
		const source = Number.POSITIVE_INFINITY;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write negative infinity', () => {
		const source = Number.NEGATIVE_INFINITY;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});

describe('unsigned integers', () => {
	it('should write uint 8', () => {
		const source = 123;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write uint 16', () => {
		const source = 1234;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write uint 32', () => {
		const source = 123456;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write uint var', () => {
		const source = 1234567890123;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});

describe('signed integers', () => {
	it('should write int 8', () => {
		const source = -63;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write int 16', () => {
		const source = -1234;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write int 32', () => {
		const source = -123456;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write int var', () => {
		const source = -1234567890123;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});

describe('float numbers', () => {
	it('should write float 32', () => {
		const source = 1234.567;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBeCloseTo(source, 3);
	});

	it('should write float 64', () => {
		const source = -1234.5678901234;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBeCloseTo(source, 10);
	});
});
