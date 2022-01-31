/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

describe('buffers', () => {
	it('should write empty buffer', () => {
		const buffer = new ArrayBuffer(0);

		const writer = new BufferWriter();
		writer.writeBuffer(buffer);
		expect(writer.length).toBe(1);

		const reader = new BufferReader(writer.buffer);
		expect(reader.readBuffer().byteLength).toBe(0);
	});

	it('should write buffer', () => {
		const buffer = new ArrayBuffer(3);
		const array = new Uint8Array(buffer);
		array[0] = 35;
		array[1] = 15;
		array[2] = 250;

		const writer = new BufferWriter();
		writer.writeBuffer(buffer);
		expect(writer.length).toBe(4);

		const reader = new BufferReader(writer.buffer);
		const bytes = new Uint8Array(reader.readBuffer());
		expect(bytes[0]).toBe(35);
		expect(bytes[1]).toBe(15);
		expect(bytes[2]).toBe(250);
	});
});
