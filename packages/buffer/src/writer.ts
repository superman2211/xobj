import { IBuffer } from './types';

export class BufferWriter implements IBuffer {
	private _data: DataView;
	private _position: number;
	private _length: number;
	private _littleEndian: boolean;

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
			value = 0;
		} else if (value > this._length) {
			value = this._length;
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
		this._data = new DataView(new ArrayBuffer(bufferSize));
		this._position = 0;
		this._length = 0;
		this._littleEndian = littleEndian;
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
		array.set(new Uint8Array(this._data.buffer));
		this._data = new DataView(buffer);
	}

	private movePosition(value: number) {
		this._position += value;
		if (this._length < this._position) {
			this._length = this._position;
		}
	}

	writeUint8(value: number) {
		this.allocate(1);
		this._data.setUint8(this._position, value);
		this.movePosition(1);
	}

	writeUint16(value: number) {
		this.allocate(2);
		this._data.setUint16(this._position, value, this._littleEndian);
		this.movePosition(2);
	}

	writeUint32(value: number) {
		this.allocate(4);
		this._data.setUint32(this._position, value, this._littleEndian);
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
		this._data.setInt8(this._position, value);
		this.movePosition(1);
	}

	writeInt16(value: number) {
		this.allocate(2);
		this._data.setInt16(this._position, value, this._littleEndian);
		this.movePosition(2);
	}

	writeInt32(value: number) {
		this.allocate(4);
		this._data.setInt32(this._position, value, this._littleEndian);
		this.movePosition(4);
	}

	writeFloat32(value: number) {
		this.allocate(4);
		this._data.setFloat32(this._position, value, this._littleEndian);
		this.movePosition(4);
	}

	writeFloat64(value: number) {
		this.allocate(8);
		this._data.setFloat64(this._position, value, this._littleEndian);
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
