import { IStream } from './IStream';

export class StreamReader implements IStream {
	private _data: DataView;
	private _position: number;

	public get length(): number {
		return this._data.buffer.byteLength;
	}

	public get position(): number {
		return this._position;
	}

	public set position(value: number) {
		if (value < 0) {
			value = 0;
		} else if (value > this.length) {
			value = this.length;
		}

		this._position = value;
	}

	public get buffer(): ArrayBuffer {
		return this._data.buffer;
	}

	constructor(buffer: ArrayBuffer) {
		this._data = new DataView(buffer);
		this._position = 0;
	}

	private movePosition(value: number) {
		this._position += value;
	}

	public readUint8(): number {
		const value = this._data.getUint8(this._position);
		this.movePosition(1);
		return value;
	}

	public readUint16(): number {
		const value = this._data.getUint16(this._position);
		this.movePosition(2);
		return value;
	}

	public readUint32(): number {
		const value = this._data.getUint32(this._position);
		this.movePosition(4);
		return value;
	}

	public readUintVar(): number {
		let value = 0;
		let bits = 0;
		let byte = 0;

		do {
			byte = this.readUint8();
			value |= ((byte & 0x7f) << bits);
			bits += 7;
		} while (byte & 0x80);

		return value >>> 0;
	}

	public readInt8(): number {
		const value = this._data.getInt8(this._position);
		this.movePosition(1);
		return value;
	}

	public readInt16(): number {
		const value = this._data.getInt16(this._position);
		this.movePosition(2);
		return value;
	}

	public readInt32(): number {
		const value = this._data.getInt32(this._position);
		this.movePosition(4);
		return value;
	}
}
