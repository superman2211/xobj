/* eslint-disable no-undef */

import { StreamReader } from '../src/StreamReader';
import { StreamWriter } from '../src/StreamWriter';

describe('strings', () => {
	it('should write empty string', () => {
		const writer = new StreamWriter();
		writer.writeString('');
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.readString()).toBe('');
	});

	it('should write string in english', () => {
		const writer = new StreamWriter();
		writer.writeString('simple string');
		expect(writer.length).toBe(14);

		const reader = new StreamReader(writer.buffer);
		expect(reader.readString()).toBe('simple string');
	});

	it('should write string in russian', () => {
		const writer = new StreamWriter();
		writer.writeString('простая строка');
		expect(writer.length).toBe(28);

		const reader = new StreamReader(writer.buffer);
		expect(reader.readString()).toBe('простая строка');
	});

	it('should write string in japanese', () => {
		const writer = new StreamWriter();
		writer.writeString('単純な文字列');
		expect(writer.length).toBe(18);

		const reader = new StreamReader(writer.buffer);
		expect(reader.readString()).toBe('単純な文字列');
	});
});
