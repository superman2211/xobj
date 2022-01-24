/* eslint-disable no-undef */

import { StreamReader } from '../src/StreamReader';
import { StreamWriter } from '../src/StreamWriter';

describe('length and position', () => {
	it('should get length of empty stream', () => {
		const writer = new StreamWriter();
		expect(writer.length).toBe(0);
	});

	it('should get correct length and position', () => {
		const writer = new StreamWriter();
		writer.writeInt8(123);
		expect(writer.position).toBe(1);
		writer.writeUint16(2048);
		expect(writer.position).toBe(3);
		writer.writeUint32(123456789);
		expect(writer.position).toBe(7);
		writer.position = 1;
		writer.writeInt16(-2048);
		expect(writer.position).toBe(3);
		expect(writer.length).toBe(7);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(7);
		expect(reader.readInt8()).toBe(123);
		expect(reader.position).toBe(1);
		expect(reader.readInt16()).toBe(-2048);
		expect(reader.position).toBe(3);
		expect(reader.readUint32()).toBe(123456789);
		expect(reader.position).toBe(7);
		reader.position = 1;
		expect(reader.readInt16()).toBe(-2048);
		expect(reader.position).toBe(3);
	});

	it('should get correct length after allocate', () => {
		const writer = new StreamWriter();
		let i = 3000;
		while (i--) {
			writer.writeUint8(1);
		}
		expect(writer.length).toBe(3000);
		expect(writer.bufferSize).toBe(4096);
	});
});
