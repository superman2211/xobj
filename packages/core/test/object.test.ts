/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('object', () => {
	it('should write empty object', () => {
		const source = {};

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);
	});

	it('should write object with number keys', () => {
		const source = {
			one: 11,
			two: 22,
			11: 'one',
			22: 'two',
		};

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);
	});

	it('should write simple object', () => {
		const source = {
			name: 'John Doe',
			age: 33,
			gender: 'male',
			children: [
				{ name: 'Jane', age: 12 },
				{ name: 'Jack', age: 6 },
			],
		};

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);

		const jsonData = new TextEncoder().encode(JSON.stringify(source));
		expect(jsonData.byteLength).toBeGreaterThan(buffer.byteLength);
	});

	it('should write object with symbols', () => {
		const s1 = Symbol('one');
		const s2 = Symbol('two');

		const source = {
			one: 11,
			11: 'one',
			symbols: [s1, s2],
			[s1]: 'symbol one',
			[s2]: 'symbol two',
		};

		const buffer = encode(source);

		const target = decode(buffer);

		expect(target.one).toBe(source.one);
		expect(target[11]).toBe(source[11]);
		expect(target[target.symbols[0]]).toBe('symbol one');
		expect(target[target.symbols[1]]).toBe('symbol two');
	});
});
