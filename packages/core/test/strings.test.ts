/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('string', () => {
	it('should write simple string', () => {
		const source = 'simple string';

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toBe(source);
	});
});
