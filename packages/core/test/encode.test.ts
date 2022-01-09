/* eslint-disable no-undef */

import { encode } from '../src/encode';

describe('boolean', () => {
	it('should write false', () => {
		const buffer = encode(false);
		expect(buffer.byteLength).toBe(1);
	});

	it('should write true', () => {
		const buffer = encode(true);
		expect(buffer.byteLength).toBe(1);
	});
});

describe('number', () => {
	it('should write number', () => {
		const buffer = encode(123);
		expect(buffer.byteLength).toBe(2);
	});
});

describe('string', () => {
	it('should write string', () => {
		const buffer = encode('simple string');
		expect(buffer.byteLength).toBe(15);
	});
});

describe('array', () => {
	it('should write array', () => {
		const array = [
			235,
			-234,
			22.533,
			'simple string',
			null,
			true,
			false,
			{ name: 'John', age: 33 },
		];

		const json = JSON.stringify(array);
		console.log(json.length);
		const buffer = encode(array);
		expect(buffer.byteLength).toBe(60);
	});
});

describe('object', () => {
	it('should write object', () => {
		const user = {
			name: 'John Doe',
			age: '35',
			admin: true,
		};
		const json = JSON.stringify(user);
		console.log(json.length);
		const buffer = encode(user);
		expect(buffer.byteLength).toBe(32);
	});
});
