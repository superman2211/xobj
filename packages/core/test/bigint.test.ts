/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('bigint', () => {
	it('should write short bigint', () => {
		const source = 123456n;

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(5);

		const target: bigint = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write long bigint', () => {
		const source = 37916874628754687216785631897657896138568913267586132865879132656137285687168756183265n;

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(38);

		const target: bigint = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write array of bigints', () => {
		const source = [
			328463186n,
			326462187494859083405n,
			-2362n,
			-32985742957897236756124786576278587256n,
			23723323n,
		];

		const buffer = encode(source);
		expect(buffer.byteLength).toBe(44);

		const target: bigint = decode(buffer);
		expect(target).toEqual(source);
	});
});
