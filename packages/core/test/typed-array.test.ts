/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('typed array', () => {
	it('should write Uint8Array', () => {
		const source = new Uint8Array([2, 3, 45, 33, 102]);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(8);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target.byteLength).toBe(source.byteLength);
	});

	it('should write Uint16Array', () => {
		const source = new Uint16Array([2, 3, 456, 3344, 10283]);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(13);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target.byteLength).toBe(source.byteLength);
	});

	it('should write Uint32Array', () => {
		const source = new Uint32Array([1, 43, 567, 6723344, 263723283]);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(23);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target.byteLength).toBe(source.byteLength);
	});

	it('should write simple data view', () => {
		const source = new DataView(new ArrayBuffer(6));
		source.setInt16(0, -345);
		source.setUint32(2, 567890);

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(9);

		const target: DataView = decode(buffer);
		expect(target.getInt16(0)).toBe(-345);
		expect(target.getUint32(2)).toBe(567890);
	});
});
