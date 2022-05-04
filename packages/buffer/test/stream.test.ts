/* eslint-disable no-undef */
import { BufferReader } from '../src/reader';
import { BufferWriter } from '../src/writer';
import { FastBufferWriter } from '../src/fast-writer';
import { IBufferReader, IBufferWriter } from '../src/types';

type ReaderClass = new (...args: any[]) => IBufferReader;
type WriterClass = new (...args: any[]) => IBufferWriter;

function group(name: string, Reader: ReaderClass, Writer: WriterClass) {
	describe(name, () => {
		it('should get length of empty stream', () => {
			const writer = new Writer();
			expect(writer.length).toBe(0);
		});

		it('should get correct length and position', () => {
			const writer = new Writer();
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

			const { buffer } = writer;

			const reader = new Reader(buffer);
			expect(reader.length).toBe(7);
			expect(reader.buffer).toBe(buffer);
			expect(reader.buffer.byteLength).toBe(7);
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
			const writer = new Writer();
			let i = 3000;
			while (i--) {
				writer.writeUint8(1);
			}
			expect(writer.length).toBe(3000);
			expect(writer.bufferSize).toBe(4096);
		});

		it('should write data in big endian', () => {
			const writer = new Writer(1024, false);
			writer.writeInt32(78901);
			expect(writer.littleEndian).toBe(false);

			const { buffer } = writer;
			const array = new Uint8Array(buffer);

			expect(array[0]).toBe(0);
			expect(array[1]).toBe(1);
			expect(array[2]).toBe(52);
			expect(array[3]).toBe(53);
			const reader = new Reader(buffer, false);
			expect(reader.readInt32()).toBe(78901);
			expect(reader.littleEndian).toBe(false);
		});

		it('should write data in little endian', () => {
			const writer = new Writer(1024, true);
			writer.writeInt32(78901);
			expect(writer.littleEndian).toBe(true);

			const { buffer } = writer;
			const array = new Uint8Array(buffer);

			expect(array[0]).toBe(53);
			expect(array[1]).toBe(52);
			expect(array[2]).toBe(1);
			expect(array[3]).toBe(0);

			const reader = new Reader(buffer, true);
			expect(reader.bytesAvailable).toBe(4);
			expect(reader.readInt32()).toBe(78901);
			expect(reader.bytesAvailable).toBe(0);
			expect(reader.littleEndian).toBe(true);
		});

		it('should change position', () => {
			const writer = new Writer(1024, false);
			expect(writer.position).toBe(0);
			writer.writeInt32(78901);
			expect(writer.position).toBe(4);
			writer.position = 2;
			expect(writer.bytesAvailable).toBe(2);
			expect(writer.position).toBe(2);

			const { buffer } = writer;

			const reader = new Reader(buffer, false);
			expect(reader.position).toBe(0);
			expect(reader.readInt32()).toBe(78901);
			expect(reader.position).toBe(4);
			reader.position = 3;
			expect(reader.position).toBe(3);
		});

		it('should throw error when position out of range', () => {
			const writer = new Writer(1024, false);
			writer.writeInt32(78901);

			expect(() => {
				writer.position = -1;
			}).toThrow();

			expect(() => {
				writer.position = 10;
			}).toThrow();

			const { buffer } = writer;

			const reader = new Reader(buffer, false);

			expect(() => {
				reader.position = -3;
			}).toThrow();

			expect(() => {
				reader.position = 5;
			}).toThrow();
		});
	});
}

group('stream', BufferReader, BufferWriter);
group('stream fast', BufferReader, FastBufferWriter);
