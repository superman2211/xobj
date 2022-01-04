export class StreamWriter {
	private _data: DataView;
	private _position: number;
	private _length: number;

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

	writeInt8(value: number) {
		this.allocate(1);
		this._data.setInt8(this._position, value);
		this.movePosition(1);
	}
}
