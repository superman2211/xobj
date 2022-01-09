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

describe('basic types', () => {
	it('should write numbers correctly', () => {
		const writer = new StreamWriter();
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

		const reader = new StreamReader(writer.buffer);
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

describe('variable unsigned integer', () => {
	it('should write unsigned integer in 1 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(127);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readUintVar()).toBe(127);
	});

	it('should write unsigned integer in 2 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(128);
		expect(writer.length).toBe(2);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readUintVar()).toBe(128);
	});

	it('should write unsigned integer in 3 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfabf);
		expect(writer.length).toBe(3);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(3);
		expect(reader.readUintVar()).toBe(0xfabf);
	});

	it('should write unsigned integer in 4 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfabcdf);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readUintVar()).toBe(0xfabcdf);
	});

	it('should write unsigned integer in 4 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfff_ffff);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readUintVar()).toBe(0xfff_ffff);
	});

	it('should write unsigned integer in 5 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xffff_ffff);
		expect(writer.length).toBe(5);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(5);
		expect(reader.readUintVar()).toBe(0xffff_ffff);
	});
});

describe('strings', () => {
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

describe('buffers', () => {
	it('should write empty buffer', () => {
		const buffer = new ArrayBuffer(0);

		const writer = new StreamWriter();
		writer.writeBuffer(buffer);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.readBuffer().byteLength).toBe(0);
	});

	it('should write buffer', () => {
		const buffer = new ArrayBuffer(3);
		const array = new Uint8Array(buffer);
		array[0] = 35;
		array[1] = 15;
		array[2] = 250;

		const writer = new StreamWriter();
		writer.writeBuffer(buffer);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		const bytes = new Uint8Array(reader.readBuffer());
		expect(bytes[0]).toBe(35);
		expect(bytes[1]).toBe(15);
		expect(bytes[2]).toBe(250);
	});
});
