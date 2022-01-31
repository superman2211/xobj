/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('array', () => {
	it('should write empty array', () => {
		const source = [];

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(2);

		const target = decode(buffer);
		expect(target.length).toBe(0);
	});

	it('should write simple array', () => {
		const source = [235, -234, 22.533, 'simple string', null, true, false];

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(30);

		const target = decode(buffer);
		expect(target.length).toBe(source.length);
		expect(target[0]).toBe(source[0]);
		expect(target[1]).toBe(source[1]);
		expect(target[2]).toBeCloseTo(source[2] as number, 3);
		expect(target[3]).toBe(source[3]);
		expect(target[4]).toBe(source[4]);
		expect(target[5]).toBe(source[5]);
		expect(target[6]).toBe(source[6]);

		const jsonData = new TextEncoder().encode(JSON.stringify(source));
		expect(jsonData.byteLength).toBeGreaterThan(buffer.byteLength);
	});

	it('should write non filled array', () => {
		const source = [];
		source[0] = 0;
		source[1] = 1;
		source[2] = 2;
		source[10] = 3;

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(17);

		const target = decode(buffer);
		expect(target.length).toBe(source.length);
		expect(target[0]).toBe(source[0]);
		expect(target[1]).toBe(source[1]);
		expect(target[2]).toBe(source[2]);
		expect(target[10]).toBe(source[10]);
	});
});
