/* eslint-disable no-undef */

import { StreamReader } from '../src/StreamReader';
import { StreamWriter } from '../src/StreamWriter';

const maxSafeInteger = Number.MAX_SAFE_INTEGER;

describe('variable unsigned integer', () => {
	it('should write unsigned integer in 1 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(127);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readUintVar()).toBe(127);
	});

	it('should write unsigned integer in 2 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(128);
		expect(writer.length).toBe(2);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readUintVar()).toBe(128);
	});

	it('should write unsigned integer in 3 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfabf);
		expect(writer.length).toBe(3);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(3);
		expect(reader.readUintVar()).toBe(0xfabf);
	});

	it('should write unsigned integer in 4 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfabcdf);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readUintVar()).toBe(0xfabcdf);
	});

	it('should write unsigned integer in 4 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xfff_ffff);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readUintVar()).toBe(0xfff_ffff);
	});

	it('should write unsigned integer in 5 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xffff_ffff);
		expect(writer.length).toBe(5);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(5);
		expect(reader.readUintVar()).toBe(0xffff_ffff);
	});

	it('should write max unsigned integer in 8 bytes', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(maxSafeInteger);
		expect(writer.length).toBe(8);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(8);
		expect(reader.readUintVar()).toBe(maxSafeInteger);
	});

	it('should write unsigned power of two integers', () => {
		for (let i = 0; i < 53; i++) {
			const source = 2 ** i - 1;
			const writer = new StreamWriter();
			writer.writeUintVar(source);
			const reader = new StreamReader(writer.buffer);
			const target = reader.readUintVar();
			expect(target).toBe(source);
		}
	});
});

describe('variable signed integer', () => {
	it('should write zero in 1 byte', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(0);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readIntVar()).toBe(0);
	});

	it('should write negative integer in 1 byte', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(-60);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readIntVar()).toBe(-60);
	});

	it('should write negative integer in 2 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(-200);
		expect(writer.length).toBe(2);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readIntVar()).toBe(-200);
	});

	it('should write negative integer in 3 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(-20000);
		expect(writer.length).toBe(3);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(3);
		expect(reader.readIntVar()).toBe(-20000);
	});

	it('should write negative integer in 4 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(-2000000);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readIntVar()).toBe(-2000000);
	});

	it('should write negative integer in 5 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(-1 * 0x8000_0000);
		expect(writer.length).toBe(5);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(5);
		expect(reader.readIntVar()).toBe(-1 * 0x8000_0000);
	});

	it('should write positive integer in 1 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(63);
		expect(writer.length).toBe(1);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(1);
		expect(reader.readIntVar()).toBe(63);
	});

	it('should write positive integer in 2 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(200);
		expect(writer.length).toBe(2);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(2);
		expect(reader.readIntVar()).toBe(200);
	});

	it('should write positive integer in 3 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(20000);
		expect(writer.length).toBe(3);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(3);
		expect(reader.readIntVar()).toBe(20000);
	});

	it('should write positive integer in 4 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(2000000);
		expect(writer.length).toBe(4);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(4);
		expect(reader.readIntVar()).toBe(2000000);
	});

	it('should write positive integer in 5 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(0x8000_0000);
		expect(writer.length).toBe(5);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(5);
		expect(reader.readIntVar()).toBe(0x8000_0000);
	});

	it('should write max signed integers in 16 bytes', () => {
		const writer = new StreamWriter();
		writer.writeIntVar(maxSafeInteger);
		writer.writeIntVar(-maxSafeInteger);
		expect(writer.length).toBe(16);

		const reader = new StreamReader(writer.buffer);
		expect(reader.length).toBe(16);
		expect(reader.readIntVar()).toBe(maxSafeInteger);
		expect(reader.readIntVar()).toBe(-maxSafeInteger);
	});

	it('should write unsigned power of two integers', () => {
		for (let i = 1; i < 53; i++) {
			const source = 2 ** i - 1;
			const writer = new StreamWriter();
			writer.writeIntVar(source);
			writer.writeIntVar(-source);
			const reader = new StreamReader(writer.buffer);
			expect(reader.readIntVar()).toBe(source);
			expect(reader.readIntVar()).toBe(-source);
		}
	});
});
