/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('boolean', () => {
	it('should write false', () => {
		const source = false;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write true', () => {
		const source = true;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});
