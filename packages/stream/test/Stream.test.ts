/* eslint-disable no-undef */

import { StreamReader } from '../src';
import { StreamWriter } from '../src/StreamWriter';

describe('length', () => {
	it('should get length of empty stream', () => {
		const writer = new StreamWriter();
		expect(writer.length).toBe(0);
	});

	it('should get correct length', () => {
		const writer = new StreamWriter();
		writer.writeInt8(1);
		writer.writeUint8(2);
		expect(writer.length).toBe(2);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readInt8()).toBe(1);
		expect(reader.readUint8()).toBe(2);
	});

	it('should get correct length after allocate', () => {
		const writer = new StreamWriter();
		let i = 1200;
		while (i--) {
			writer.writeUint8(1);
		}
		expect(writer.length).toBe(1200);
	});
});

describe('writeUintVar', () => {
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
		writer.writeUintVar(0xffff_fff);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readUintVar()).toBe(0xffff_fff);
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

describe('writeString', () => {
	it('should write string in english', () => {
		const writer = new StreamWriter();
		writer.writeString('simple string');
		expect(writer.length).toBe(14);
	});

	it('should write string in russian', () => {
		const writer = new StreamWriter();
		writer.writeString('простая строка');
		expect(writer.length).toBe(28);
	});

	it('should write string in japanese', () => {
		const writer = new StreamWriter();
		writer.writeString('単純な文字列');
		expect(writer.length).toBe(18);
	});
});

describe('writeBuffer', () => {
	it('should write buffer', () => {
		const buffer = new ArrayBuffer(3);
		const array = new Uint8Array(buffer);
		array[0] = 1;
		array[1] = 2;
		array[2] = 3;

		const writer = new StreamWriter();
		writer.writeBuffer(buffer);
		expect(writer.length).toBe(4);
	});
});
