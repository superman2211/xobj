/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('map', () => {
	it('should write simple map', () => {
		const source = new Map();
		source.set(1, 'test 1');
		source.set(2, 'test 2');
		source.set(3, 'test 3');
		source.set('test 1', true);
		source.set('test 2', false);
		source.set('test 3', true);
		source.set({ x: 1 }, [1, 2, 3]);
		source.set(4, 'test 4');
		source.set(5, 'test 5');

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target).toEqual(source);
	});
});
