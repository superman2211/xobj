/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';
import { VERSION } from '../src/version';

describe('header', () => {
	it('should throw when incorrect version', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const incorrectVersion = 22;

		const view = new DataView(buffer);
		view.setUint8(0, incorrectVersion); // set incorrect version

		const act = () => {
			decode(buffer);
		};

		expect(act).toThrow(`Unexpected version: ${incorrectVersion}, required version: ${VERSION}`);
	});

	it('should throw when incorrect float type', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const view = new DataView(buffer);
		view.setUint8(1, 5); // set incorrect floatQuality

		const act = () => {
			decode(buffer);
		};

		expect(act).toThrow();
	});
});
