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

describe('bitset', () => {
	it('should write empty bitset in 0 bytes', () => {
		const bitset = [];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(0);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});

	it('should write bitset 4 in 1 byte', () => {
		const bitset = [false, false, true, true];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});

	it('should write bitset 8 in 1 byte', () => {
		const bitset = [false, true, false, true, true, true, false, false];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});

	it('should write bitset 9 in 2 bytes', () => {
		const bitset = [false, true, false, true, true, true, false, false, true];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(2);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});

	it('should write bitset 19 in 3 bytes', () => {
		const bitset = [
			false, true, false, true, true, false, true, false,
			true, false, false, true, true, false, true, false,
			true, false, false,
		];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(3);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});

	it('should write bitset 73 in 10 bytes', () => {
		const bitset = [
			false, true, false, true, true, false, true, false,
			true, false, false, true, true, false, true, false,
			true, false, true, false, true, true, false, true,
			false, true, false, true, true, false, true, false,
			true, false, false, true, false, false, true, false,
			true, false, true, false, true, true, false, true,
			false, true, false, true, true, false, true, false,
			true, false, false, true, false, false, true, false,
			true, false, true, false, true, true, false, true,
			true, false, false,
		];

		const writer = new BufferWriter();
		writer.writeBitset(bitset);
		expect(writer.length).toBe(10);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBitset(bitset.length)).toEqual(bitset);
	});
});
