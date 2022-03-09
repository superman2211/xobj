/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

describe('bigint', () => {
	it('should write zero bigint', () => {
		const writer = new BufferWriter();
		writer.writeBigInt(0n);
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readBigInt()).toBe(0n);
	});

	it('should write unsigned bigint in 2 byte', () => {
		const writer = new BufferWriter();
		writer.writeBigInt(127n);
		expect(writer.length).toBe(2);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readBigInt()).toBe(127n);
	});

	it('should write short signed bigint', () => {
		const writer = new BufferWriter();
		writer.writeBigInt(-123456n);
		expect(writer.length).toBe(4);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readBigInt()).toBe(-123456n);
	});

	it('should write long bigint', () => {
		const writer = new BufferWriter();
		writer.writeBigInt(9007199254740991n);
		expect(writer.length).toBe(8);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(8);
		expect(reader.readBigInt()).toBe(9007199254740991n);
	});

	it('should write very long bigint', () => {
		const writer = new BufferWriter();
		writer.writeBigInt(90071992547409234622376582765872452967643526456278657827567265762347659236578264785672891n);
		expect(writer.length).toBe(38);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(38);
		expect(reader.readBigInt()).toBe(90071992547409234622376582765872452967643526456278657827567265762347659236578264785672891n);
	});
});
