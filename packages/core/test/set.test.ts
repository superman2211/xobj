/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('set', () => {
	it('should write simple set', () => {
		const source = new Set([1, 2, 3, 4, 'test', true, undefined, undefined, { x: 1, y: 2 }]);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(28);

		const target = decode(buffer);
		expect(target).toEqual(source);
	});
});
