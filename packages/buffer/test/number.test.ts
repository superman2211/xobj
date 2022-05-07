/* eslint-disable no-undef */
import { IBufferReader, IBufferWriter } from '../src/types';
import { FastBufferWriter } from '../src/fast-writer';
import { FastBufferReader } from '../src/fast-reader';
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';

type ReaderClass = new (...args: any[]) => IBufferReader;
type WriterClass = new (...args: any[]) => IBufferWriter;

function act(Reader: ReaderClass, Writer: WriterClass, littleEndian: boolean) {
	it('should write numbers correctly', () => {
		const writer = new Writer(1024, littleEndian);
		writer.writeInt8(123);
		writer.writeInt8(-45);
		writer.writeInt16(10456);
		writer.writeInt16(-1000);
		writer.writeInt32(78901);
		writer.writeInt32(-6376247);
		writer.writeUint8(245);
		writer.writeUint16(2048);
		writer.writeUint32(0xabcdef);
		writer.writeFloat32(123.456);
		writer.writeFloat64(1234.56789);
		expect(writer.length).toBe(33);
		expect(writer.position).toBe(33);

		const reader = new Reader(writer.buffer, littleEndian);
		expect(reader.length).toBe(33);
		expect(reader.readInt8()).toBe(123);
		expect(reader.readInt8()).toBe(-45);
		expect(reader.readInt16()).toBe(10456);
		expect(reader.readInt16()).toBe(-1000);
		expect(reader.readInt32()).toBe(78901);
		expect(reader.readInt32()).toBe(-6376247);
		expect(reader.readUint8()).toBe(245);
		expect(reader.readUint16()).toBe(2048);
		expect(reader.readUint32()).toBe(0xabcdef);
		expect(reader.readFloat32()).toBeCloseTo(123.456, 3);
		expect(reader.readFloat64()).toBeCloseTo(1234.56789, 5);
		expect(reader.position).toBe(33);
	});
}

describe('number big endian', () => {
	describe('BufferReader & BufferWriter', () => {
		act(BufferReader, BufferWriter, false);
	});

	describe('FastBufferReader & BufferWriter', () => {
		act(FastBufferReader, BufferWriter, false);
	});

	describe('BufferReader & FastBufferWriter', () => {
		act(BufferReader, FastBufferWriter, false);
	});

	describe('FastBufferReader & FastBufferWriter', () => {
		act(FastBufferReader, FastBufferWriter, false);
	});
});

describe('number little endian', () => {
	describe('BufferReader & BufferWriter', () => {
		act(BufferReader, BufferWriter, true);
	});

	describe('FastBufferReader & BufferWriter', () => {
		act(FastBufferReader, BufferWriter, true);
	});

	describe('BufferReader & FastBufferWriter', () => {
		act(BufferReader, FastBufferWriter, true);
	});

	describe('FastBufferReader & FastBufferWriter', () => {
		act(FastBufferReader, FastBufferWriter, true);
	});
});
