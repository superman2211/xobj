/* eslint-disable symbol-description */
/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('symbol', () => {
	it('should write symbols', () => {
		const s1 = Symbol();
		const s2 = Symbol();

		const source = [
			{ x: 1, y: 2, id: s1 },
			{ x: 2, y: 3, id: s2 },
			{ x: 3, y: 4, id: s1 },
			{ x: 4, y: 5, id: s2 },
		];

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target[0].id).toBe(target[2].id);
		expect(target[1].id).toBe(target[3].id);
		expect(target[0].id).not.toBe(target[1].id);
		expect(target[2].id).not.toBe(target[3].id);
	});
});
