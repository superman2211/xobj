import { IBufferWriter } from './types';
import { isLittleEndian } from './utils';

const cacheBuffer = new ArrayBuffer(8);
const uint8Array = new Uint8Array(cacheBuffer);
const uint16Array = new Uint16Array(cacheBuffer);
const uint32Array = new Uint32Array(cacheBuffer);
const int16Array = new Int16Array(cacheBuffer);
const int32Array = new Int32Array(cacheBuffer);
const float32Array = new Float32Array(cacheBuffer);
const float64Array = new Float64Array(cacheBuffer);

export class FastBufferWriter implements IBufferWriter {
	private _data: Uint8Array;
	private _position: number;
	private _length: number;
	private _littleEndian: boolean;

	readonly writeUint16: (value: number) => void;
	readonly writeUint32: (value: number) => void;

	readonly writeInt16: (value: number) => void;
	readonly writeInt32: (value: number) => void;

	readonly writeFloat32: (value: number) => void;
	readonly writeFloat64: (value: number) => void;

	get littleEndian(): boolean {
		return this._littleEndian;
	}

	get length(): number {
		return this._length;
	}

	get bytesAvailable(): number {
		return this._length - this._position;
	}

	get position(): number {
		return this._position;
	}

	set position(value: number) {
		if (value < 0) {
			throw 'out of range';
		} else if (value > this._length) {
			throw 'out of range';
		}

		this._position = value;
	}

	get buffer(): ArrayBuffer {
		return this._data.buffer.slice(0, this._length);
	}

	get bufferSize(): number {
		return this._data.buffer.byteLength;
	}

	constructor(bufferSize: number = 1024, littleEndian: boolean = false) {
		this._data = new Uint8Array(new ArrayBuffer(bufferSize));
		this._position = 0;
		this._length = 0;
		this._littleEndian = littleEndian;

		if (!isLittleEndian()) {
			littleEndian = !littleEndian;
		}

		this.writeUint16 = littleEndian ? this.writeUint16Little : this.writeUint16Big;
		this.writeUint32 = littleEndian ? this.writeUint32Little : this.writeUint32Big;

		this.writeInt16 = littleEndian ? this.writeInt16Little : this.writeInt16Big;
		this.writeInt32 = littleEndian ? this.writeInt32Little : this.writeInt32Big;

		this.writeFloat32 = littleEndian ? this.writeFloat32Little : this.writeFloat32Big;
		this.writeFloat64 = littleEndian ? this.writeFloat64Little : this.writeFloat64Big;
	}

	private allocate(bytes: number) {
		const targetSize = this._position + bytes;
		let size = this._data.buffer.byteLength;

		if (targetSize < size) {
			return;
		}

		while (size < targetSize) {
			size *= 2;
		}

		const buffer = new ArrayBuffer(size);
		const array = new Uint8Array(buffer);
		array.set(this._data);
		this._data = array;
	}

	private movePosition(value: number) {
		this._position += value;
		if (this._length < this._position) {
			this._length = this._position;
		}
	}

	writeUint8(value: number) {
		this.allocate(1);
		this._data[this._position] = value;
		this.movePosition(1);
	}

	private writeUint16Little(value: number) {
		this.allocate(2);
		uint16Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this.movePosition(2);
	}

	private writeUint16Big(value: number) {
		this.allocate(2);
		uint16Array[0] = value;
		this._data[this._position] = uint8Array[1]!;
		this._data[this._position + 1] = uint8Array[0]!;
		this.movePosition(2);
	}

	private writeUint32Little(value: number) {
		this.allocate(4);
		uint32Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this._data[this._position + 2] = uint8Array[2]!;
		this._data[this._position + 3] = uint8Array[3]!;
		this.movePosition(4);
	}

	private writeUint32Big(value: number) {
		this.allocate(4);
		uint32Array[0] = value;
		this._data[this._position] = uint8Array[3]!;
		this._data[this._position + 1] = uint8Array[2]!;
		this._data[this._position + 2] = uint8Array[1]!;
		this._data[this._position + 3] = uint8Array[0]!;
		this.movePosition(4);
	}

	writeUintVar(value: number) {
		let next = false;
		do {
			let byte: number = value & 0x7f;
			value /= 128;
			next = value >= 1;
			if (next) {
				byte |= 0x80;
			}
			this.writeUint8(byte);
		} while (next);
	}

	writeIntVar(value: number) {
		let sign = 0;
		if (value < 0) {
			value = -value;
			sign = 1;
		}
		let byte: number = ((value & 0x3f) << 1) | sign;
		value /= 64;
		const next = value >= 1;
		if (next) {
			byte |= 0x80;
		}

		this.writeUint8(byte);

		if (next) {
			this.writeUintVar(value);
		}
	}

	writeInt8(value: number) {
		this.allocate(1);
		this._data[this._position] = value;
		this.movePosition(1);
	}

	private writeInt16Little(value: number) {
		this.allocate(2);
		int16Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this.movePosition(2);
	}

	private writeInt16Big(value: number) {
		this.allocate(2);
		int16Array[0] = value;
		this._data[this._position] = uint8Array[1]!;
		this._data[this._position + 1] = uint8Array[0]!;
		this.movePosition(2);
	}

	private writeInt32Little(value: number) {
		this.allocate(4);
		int32Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this._data[this._position + 2] = uint8Array[2]!;
		this._data[this._position + 3] = uint8Array[3]!;
		this.movePosition(4);
	}

	private writeInt32Big(value: number) {
		this.allocate(4);
		int32Array[0] = value;
		this._data[this._position] = uint8Array[3]!;
		this._data[this._position + 1] = uint8Array[2]!;
		this._data[this._position + 2] = uint8Array[1]!;
		this._data[this._position + 3] = uint8Array[0]!;
		this.movePosition(4);
	}

	private writeFloat32Little(value: number) {
		this.allocate(4);
		float32Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this._data[this._position + 2] = uint8Array[2]!;
		this._data[this._position + 3] = uint8Array[3]!;
		this.movePosition(4);
	}

	private writeFloat32Big(value: number) {
		this.allocate(4);
		float32Array[0] = value;
		this._data[this._position] = uint8Array[3]!;
		this._data[this._position + 1] = uint8Array[2]!;
		this._data[this._position + 2] = uint8Array[1]!;
		this._data[this._position + 3] = uint8Array[0]!;
		this.movePosition(4);
	}

	private writeFloat64Little(value: number) {
		this.allocate(8);
		float64Array[0] = value;
		this._data[this._position] = uint8Array[0]!;
		this._data[this._position + 1] = uint8Array[1]!;
		this._data[this._position + 2] = uint8Array[2]!;
		this._data[this._position + 3] = uint8Array[3]!;
		this._data[this._position + 4] = uint8Array[4]!;
		this._data[this._position + 5] = uint8Array[5]!;
		this._data[this._position + 6] = uint8Array[6]!;
		this._data[this._position + 7] = uint8Array[7]!;
		this.movePosition(8);
	}

	private writeFloat64Big(value: number) {
		this.allocate(8);
		float64Array[0] = value;
		this._data[this._position] = uint8Array[7]!;
		this._data[this._position + 1] = uint8Array[6]!;
		this._data[this._position + 2] = uint8Array[5]!;
		this._data[this._position + 3] = uint8Array[4]!;
		this._data[this._position + 4] = uint8Array[3]!;
		this._data[this._position + 5] = uint8Array[2]!;
		this._data[this._position + 6] = uint8Array[1]!;
		this._data[this._position + 7] = uint8Array[0]!;
		this.movePosition(8);
	}

	writeString(value: string) {
		this.writeUintVar(value.length);
		for (let i = 0; i < value.length; i++) {
			this.writeUintVar(value.charCodeAt(i));
		}
	}

	writeBigInt(value: bigint) {
		let sign = 1;

		if (value < 0) {
			sign = -1;
			value = -value;
		}

		let temp = value;
		let count = 0;

		while (temp) {
			temp >>= 8n;
			count++;
		}

		this.writeIntVar(sign * count);

		while (value) {
			const byte = value & 255n;
			this.writeUint8(Number(byte));
			value >>= 8n;
		}
	}

	writeBuffer(value: ArrayBuffer) {
		this.writeUintVar(value.byteLength);
		this.allocate(value.byteLength);
		const array = new Uint8Array(this._data.buffer);
		array.set(new Uint8Array(value), this._position);
		this.movePosition(value.byteLength);
	}

	writeFlags(value: boolean[]) {
		let bitset = 0;
		for (let i = 0; i < value.length; i++) {
			if (value[i]) {
				bitset |= 2 ** i;
			}
		}
		this.writeUintVar(bitset);
	}

	writeBitset(value: boolean[]) {
		let bitset = 0;
		let position = 0;

		for (let i = 0; i < value.length; i++) {
			if (value[i]) {
				bitset |= 2 ** position;
			}

			position++;

			if (position === 8) {
				this.writeUint8(bitset);
				bitset = 0;
				position = 0;
			}
		}

		if (position) {
			this.writeUint8(bitset);
		}
	}
}
