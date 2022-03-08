/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('array buffer', () => {
	it('should write simple array buffer', () => {
		const source = new ArrayBuffer(4);
		const array = new Uint8Array(source);
		array[0] = 11;
		array[1] = 22;
		array[2] = 19;
		array[3] = 83;

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(6);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target.byteLength).toBe(source.byteLength);
	});
});
