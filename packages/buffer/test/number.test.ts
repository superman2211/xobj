/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

describe('number', () => {
	it('should write numbers correctly', () => {
		const writer = new BufferWriter();
		writer.writeInt8(123);
		writer.writeInt16(-1000);
		writer.writeInt32(78901);
		writer.writeUint8(245);
		writer.writeUint16(2048);
		writer.writeUint32(0xabcdef);
		writer.writeFloat32(123.456);
		writer.writeFloat64(1234.56789);
		expect(writer.length).toBe(26);
		expect(writer.position).toBe(26);

		const reader = new BufferReader(writer.buffer);
		expect(reader.length).toBe(26);
		expect(reader.readInt8()).toBe(123);
		expect(reader.readInt16()).toBe(-1000);
		expect(reader.readInt32()).toBe(78901);
		expect(reader.readUint8()).toBe(245);
		expect(reader.readUint16()).toBe(2048);
		expect(reader.readUint32()).toBe(0xabcdef);
		expect(reader.readFloat32()).toBeCloseTo(123.456, 3);
		expect(reader.readFloat64()).toBeCloseTo(1234.56789, 5);
		expect(reader.position).toBe(26);
	});
});
