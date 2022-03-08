/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('typed array', () => {
	it('should write simple typed array', () => {
		const source = new Uint32Array([1, 43, 567, 6723344, 263723283]);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(23);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target.byteLength).toBe(source.byteLength);
	});
});
