export class StreamWriter {
	private _data: DataView;
	private _position: number;
	private _length: number;

	public get length(): number {
		return this._length;
	}

	public get position(): number {
		return this._position;
	}

	public set position(value: number) {
		if (value < 0) {
			value = 0;
		} else if (value > this._length) {
			value = this._length;
		}

		this._position = value;
	}

	constructor() {
		this._data = new DataView(new ArrayBuffer(1024));
		this._position = 0;
		this._length = 0;
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
		this._data.setUint16(this._position, value);
		this.movePosition(2);
	}

	writeUint32(value: number) {
		this.allocate(4);
		this._data.setUint32(this._position, value);
		this.movePosition(4);
	}

	writeUintVar(value: number) {
		do {
			let byte: number = value & 0x7f;
			value >>>= 7;
			if (value !== 0) {
				byte |= 0x80;
			}
			this.writeUint8(byte);
		} while (value !== 0);
	}

	writeInt8(value: number) {
		this.allocate(1);
		this._data.setInt8(this._position, value);
		this.movePosition(1);
	}

	writeInt16(value: number) {
		this.allocate(2);
		this._data.setInt16(this._position, value);
		this.movePosition(2);
	}

	writeInt32(value: number) {
		this.allocate(4);
		this._data.setInt32(this._position, value);
		this.movePosition(4);
	}

	writeString(value: string) {
		this.writeUintVar(value.length);
		for (let i = 0; i < value.length; i++) {
			this.writeUintVar(value.charCodeAt(i));
		}
	}
}
