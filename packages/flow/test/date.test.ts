/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('date', () => {
	it('should write simple date', () => {
		const source = new Date(1983, 11, 22, 0, 15, 33, 12);

		const buffer = encode(source);

		const target: Date = decode(buffer);
		expect(target).toEqual(source);
		expect(target.getFullYear()).toBe(1983);
		expect(target.getMonth()).toBe(11);
		expect(target.getDate()).toBe(22);
		expect(target.getHours()).toBe(0);
		expect(target.getMinutes()).toBe(15);
		expect(target.getSeconds()).toBe(33);
		expect(target.getMilliseconds()).toBe(12);
	});
});
