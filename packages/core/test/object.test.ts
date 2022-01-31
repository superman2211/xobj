/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('object', () => {
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
		expect(buffer.byteLength).toBe(86);

		const target = decode(buffer);
		expect(target).toEqual(source);

		const jsonData = new TextEncoder().encode(JSON.stringify(source));
		expect(jsonData.byteLength).toBeGreaterThan(buffer.byteLength);
	});
});
