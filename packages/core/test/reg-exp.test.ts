/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('reg exp', () => {
	it('should write simple reg exp', () => {
		const source = /(\w+)\s(\w+)/ig;

		const buffer = encode(source);

		const target: RegExp = decode(buffer);
		expect(target).toEqual(source);
		expect(target.toString()).toBe(source.toString());
		expect(target.global).toBe(source.global);
		expect(target.ignoreCase).toBe(source.ignoreCase);
		expect(target.multiline).toBe(source.multiline);
		expect(target.sticky).toBe(source.sticky);
	});
});
