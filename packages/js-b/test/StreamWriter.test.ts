/* eslint-disable no-undef */

import { StreamWriter } from '../src/StreamWriter';

describe('length', () => {
	it('should get correct length', () => {
		const writer = new StreamWriter();
		expect(writer.length).toBe(0);
	});
});
