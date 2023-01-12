/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('link', () => {
	it('should write simple links', () => {
		const p1 = { x: 1, y: 2 };
		const p2 = { x: 2, y: 1 };

		const source = [
			p1,
			p2,
			p1,
			p2,
		];

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);
	});

	it('should write recursive links', () => {
		const source: any = { x: 1, y: 2, children: [{ x: 2, y: 3 }] };
		source.children.push(source);
		source.children.push(source.children);

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);
		expect(target).toBe(target.children[1]);
		expect(target.children).toBe(target.children[2]);
	});
});
