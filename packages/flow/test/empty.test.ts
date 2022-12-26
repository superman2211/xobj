/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('empty', () => {
	it('should write null', () => {
		const source = null;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});

	it('should write undefined', () => {
		const source = undefined;

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});
