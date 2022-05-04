import { IBufferReader } from './types';
import { isLittleEndian } from './utils';

const cacheBuffer = new ArrayBuffer(8);
const uint8Array = new Uint8Array(cacheBuffer);
const uint16Array = new Uint16Array(cacheBuffer);
const uint32Array = new Uint32Array(cacheBuffer);
const int8Array = new Int8Array(cacheBuffer);
const int16Array = new Int16Array(cacheBuffer);
const int32Array = new Int32Array(cacheBuffer);
const float32Array = new Float32Array(cacheBuffer);
const float64Array = new Float64Array(cacheBuffer);

export class FastBufferReader implements IBufferReader {
	private _data: Uint8Array;
	private _position: number;
	private _littleEndian: boolean;

	readonly readUint16: () => number;
	readonly readUint32: () => number;

	readonly readInt16: () => number;
	readonly readInt32: () => number;

	readonly readFloat32: () => number;
	readonly readFloat64: () => number;

	get littleEndian(): boolean {
		return this._littleEndian;
	}

	get length(): number {
		return this._data.buffer.byteLength;
	}

	get bytesAvailable(): number {
		return this.length - this._position;
	}

	get position(): number {
		return this._position;
	}

	set position(value: number) {
		if (value < 0) {
			throw 'out of range';
		} else if (value > this.length) {
			throw 'out of range';
		}

		this._position = value;
	}

	get buffer(): ArrayBuffer {
		return this._data.buffer;
	}

	constructor(buffer: ArrayBuffer, littleEndian: boolean = false) {
		this._data = new Uint8Array(buffer);
		this._position = 0;
		this._littleEndian = littleEndian;

		if (!isLittleEndian()) {
			littleEndian = !littleEndian;
		}

		this.readUint16 = littleEndian ? this.readUint16Little : this.readUint16Big;
		this.readUint32 = littleEndian ? this.readUint32Little : this.readUint32Big;

		this.readInt16 = littleEndian ? this.readInt16Little : this.readInt16Big;
		this.readInt32 = littleEndian ? this.readInt32Little : this.readInt32Big;

		this.readFloat32 = littleEndian ? this.readFloat32Little : this.readFloat32Big;
		this.readFloat64 = littleEndian ? this.readFloat64Little : this.readFloat64Big;
	}

	private movePosition(value: number) {
		this._position += value;
	}

	readUint8(): number {
		const value = this._data[this._position];
		this.movePosition(1);
		return value;
	}

	private readUint16Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		this.movePosition(2);
		return uint16Array[0];
	}

	private readUint16Big(): number {
		uint8Array[1] = this._data[this._position];
		uint8Array[0] = this._data[this._position + 1];
		this.movePosition(2);
		return uint16Array[0];
	}

	private readUint32Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		uint8Array[2] = this._data[this._position + 2];
		uint8Array[3] = this._data[this._position + 3];
		this.movePosition(4);
		return uint32Array[0];
	}

	private readUint32Big(): number {
		uint8Array[3] = this._data[this._position];
		uint8Array[2] = this._data[this._position + 1];
		uint8Array[1] = this._data[this._position + 2];
		uint8Array[0] = this._data[this._position + 3];
		this.movePosition(4);
		return uint32Array[0];
	}

	readUintVar(): number {
		let value = 0;
		let offset = 1;
		let byte = 0;

		do {
			byte = this.readUint8();
			value += (byte & 0x7f) * offset;
			offset *= 128;
		} while (byte & 0x80);

		return value;
	}

	readIntVar(): number {
		const byte = this.readUint8();
		const sign = byte & 1 ? -1 : 1;
		let value = (byte >>> 1) & 0x3f;

		if (byte & 0x80) {
			value += this.readUintVar() * 64;
		}

		return value * sign;
	}

	readInt8(): number {
		uint8Array[0] = this._data[this._position];
		this.movePosition(1);
		return int8Array[0];
	}

	private readInt16Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		this.movePosition(2);
		return int16Array[0];
	}

	private readInt16Big(): number {
		uint8Array[1] = this._data[this._position];
		uint8Array[0] = this._data[this._position + 1];
		this.movePosition(2);
		return int16Array[0];
	}

	private readInt32Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		uint8Array[2] = this._data[this._position + 2];
		uint8Array[3] = this._data[this._position + 3];
		this.movePosition(4);
		return int32Array[0];
	}

	private readInt32Big(): number {
		uint8Array[3] = this._data[this._position];
		uint8Array[2] = this._data[this._position + 1];
		uint8Array[1] = this._data[this._position + 2];
		uint8Array[0] = this._data[this._position + 3];
		this.movePosition(4);
		return int32Array[0];
	}

	private readFloat32Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		uint8Array[2] = this._data[this._position + 2];
		uint8Array[3] = this._data[this._position + 3];
		this.movePosition(4);
		return float32Array[0];
	}

	private readFloat32Big(): number {
		uint8Array[3] = this._data[this._position];
		uint8Array[2] = this._data[this._position + 1];
		uint8Array[1] = this._data[this._position + 2];
		uint8Array[0] = this._data[this._position + 3];
		this.movePosition(4);
		return float32Array[0];
	}

	private readFloat64Little(): number {
		uint8Array[0] = this._data[this._position];
		uint8Array[1] = this._data[this._position + 1];
		uint8Array[2] = this._data[this._position + 2];
		uint8Array[3] = this._data[this._position + 3];
		uint8Array[4] = this._data[this._position + 4];
		uint8Array[5] = this._data[this._position + 5];
		uint8Array[6] = this._data[this._position + 6];
		uint8Array[7] = this._data[this._position + 7];
		this.movePosition(8);
		return float64Array[0];
	}

	private readFloat64Big(): number {
		uint8Array[7] = this._data[this._position];
		uint8Array[6] = this._data[this._position + 1];
		uint8Array[5] = this._data[this._position + 2];
		uint8Array[4] = this._data[this._position + 3];
		uint8Array[3] = this._data[this._position + 4];
		uint8Array[2] = this._data[this._position + 5];
		uint8Array[1] = this._data[this._position + 6];
		uint8Array[0] = this._data[this._position + 7];
		this.movePosition(8);
		return float64Array[0];
	}

	readString(): string {
		let count = this.readUintVar();
		if (!count) {
			return '';
		}

		let value = '';
		while (count--) {
			value += String.fromCharCode(this.readUintVar());
		}
		return value;
	}

	readBigInt(): bigint {
		let count = this.readIntVar();
		let sign = 1n;

		if (count < 0) {
			count = -count;
			sign = -1n;
		}

		let value = 0n;

		let i = 0n;

		while (count--) {
			const byte = BigInt(this.readUint8());
			value |= byte << i;
			i += 8n;
		}

		return value * sign;
	}

	readBuffer(): ArrayBuffer {
		const count = this.readUintVar();
		const value = this._data.buffer.slice(
			this._position,
			this._position + count,
		);
		this.movePosition(value.byteLength);
		return value;
	}

	readFlags(count: number): boolean[] {
		const value = this.readUintVar();
		const flags: boolean[] = [];

		for (let i = 0; i < count; i++) {
			flags.push(!!(value & (2 ** i)));
		}

		return flags;
	}

	readBitset(count: number): boolean[] {
		const value: boolean[] = [];

		if (count) {
			let bitset = this.readUint8();
			let position = 0;

			while (count--) {
				value.push(!!(bitset & (2 ** position)));
				position++;
				if (position === 8 && count) {
					bitset = this.readUint8();
					position = 0;
				}
			}
		}

		return value;
	}
}
