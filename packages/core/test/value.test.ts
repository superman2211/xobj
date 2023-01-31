/* eslint-disable no-undef */

import { decode } from '../src/decode';
import { encode } from '../src/encode';

describe('value', () => {
	it('should throw an error when decoder for value not found', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const incorrectType = 55;

		const view = new DataView(buffer);
		view.setUint8(2, incorrectType); // set incorrect value type

		const act = () => {
			decode(buffer);
		};

		expect(act).toThrow(`Decoder method not found for type: ${incorrectType}`);
	});
});
