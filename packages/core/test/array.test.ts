/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('array', () => {
	it('should write simple array', () => {
		const source = [
			235,
			-234,
			22.533,
			'simple string',
			null,
			true,
			false,
		];

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(31);

		const target = decode(buffer);
		expect(target[0]).toBe(source[0]);
		expect(target[1]).toBe(source[1]);
		expect(target[2]).toBeCloseTo(source[2] as number, 3);
		expect(target[3]).toBe(source[3]);
		expect(target[4]).toBe(source[4]);
		expect(target[5]).toBe(source[5]);
		expect(target[6]).toBe(source[6]);
	});
});
