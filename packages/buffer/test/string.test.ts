/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

describe('strings', () => {
	it('should write empty string', () => {
		const writer = new BufferWriter();
		writer.writeString('');
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readString()).toBe('');
	});

	it('should write string in english', () => {
		const writer = new BufferWriter();
		writer.writeString('simple string');
		expect(writer.length).toBe(14);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readString()).toBe('simple string');
	});

	it('should write string in russian', () => {
		const writer = new BufferWriter();
		writer.writeString('простая строка');
		expect(writer.length).toBe(28);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readString()).toBe('простая строка');
	});

	it('should write string in japanese', () => {
		const writer = new BufferWriter();
		writer.writeString('単純な文字列');
		expect(writer.length).toBe(18);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readString()).toBe('単純な文字列');
	});
});
