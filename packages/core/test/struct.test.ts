/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('array struct', () => {
	it('should write simple structs array', () => {
		const source = [
			{ x: 1, y: 2, name: 'one' },
			{ x: 3, y: 4, name: 'two' },
			{ x: 5, y: 6, name: 'three' },
			{ x: 7, y: 8, name: 'four' },
			{ x: 9, y: 10, name: 'five' },
		];

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target.length).toBe(source.length);
		expect(target).toEqual(source);
	});

	it('should write few structs array', () => {
		const source = {
			coords: [
				{ x: 1234, y: 2345 },
				{ x: 3456, y: 4567 },
				{ x: 5678, y: 6789 },
				{ x: 7891, y: 8912 },
				{ x: 9012, y: 1012 },
			],
			infos: [
				{ name: 'Sergey', age: 22 },
				{ name: 'Annd', age: 20 },
				{ name: 'Michael', age: 5 },
			],
		};

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target.coords.length).toBe(source.coords.length);
		expect(target.infos.length).toBe(source.infos.length);
		expect(target).toEqual(source);
	});
});
