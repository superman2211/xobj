/* eslint-disable no-console */
const {
	BufferReader,
	BufferWriter,
	FastBufferReader,
	FastBufferWriter,
} = require('@xobj/buffer');

const ITERATIONS = 1000000;

function test(name, Reader, Writer) {
	const time = performance.now();

	const writer = new Writer(ITERATIONS * 34);

	console.time(`${name} write`);

	for (let i = 0; i < ITERATIONS; i++) {
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
	}

	console.timeEnd(`${name} write`);

	let result = 0;

	const reader = new Reader(writer.buffer);

	console.time(`${name} read`);

	for (let i = 0; i < ITERATIONS; i++) {
		result += reader.readInt8();
		result += reader.readInt8();
		result += reader.readInt16();
		result += reader.readInt16();
		result += reader.readInt32();
		result += reader.readInt32();
		result += reader.readUint8();
		result += reader.readUint16();
		result += reader.readUint32();
		result += reader.readFloat32();
		result += reader.readFloat64();
	}

	console.timeEnd(`${name} read`);

	console.log('result', result);

	const delta = performance.now() - time;

	console.log(`${name}: ${delta} ms`);

	return delta;
}

function main() {
	const timeDataView = test('Buffer based on DataView', BufferReader, BufferWriter);
	const timeTypedArrays = test('Buffer based on TypedArrays', FastBufferReader, FastBufferWriter);
	const fasterValue = timeDataView / timeTypedArrays;
	console.log(`TypedArrays faster than DataView in ${fasterValue.toFixed(1)}`);
}

main();
