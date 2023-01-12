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
});
