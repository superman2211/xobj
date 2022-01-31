/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

describe('flags', () => {
	it('should write flags in 1 byte', () => {
		const flags = [false, true, false, true];

		const writer = new BufferWriter();
		writer.writeFlags(flags);
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readFlags(flags.length)).toEqual(flags);
	});

	it('should write flags in 2 bytes', () => {
		const flags = [true, false, true, false, true, false, false, true, true];

		const writer = new BufferWriter();
		writer.writeFlags(flags);
		expect(writer.length).toBe(2);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readFlags(flags.length)).toEqual(flags);
	});
});
