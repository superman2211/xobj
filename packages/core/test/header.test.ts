/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('header', () => {
	it('should throw when incorrect version', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const view = new DataView(buffer);
		view.setUint8(0, 3); // set incorrect version

		const act = () => {
			decode(buffer);
		};

		expect(act).toThrow();
	});

	it('should throw when incorrect float type', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const view = new DataView(buffer);
		view.setUint8(1, 5); // set incorrect floatType

		const act = () => {
			decode(buffer);
		};

		expect(act).toThrow();
	});
});
