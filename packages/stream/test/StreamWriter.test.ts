/* eslint-disable no-undef */

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
	});

	it('should write unsigned integer in 2 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(128);
		expect(writer.length).toBe(2);
	});

	it('should write unsigned integer in 3 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xffff);
		expect(writer.length).toBe(3);
	});

	it('should write unsigned integer in 4 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xffffff);
		expect(writer.length).toBe(4);
	});

	it('should write unsigned integer in 5 byte', () => {
		const writer = new StreamWriter();
		writer.writeUintVar(0xffffffff);
		expect(writer.length).toBe(5);
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
