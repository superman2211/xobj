export interface IBuffer {
	get length(): number;
	get bytesAvailable(): number;
	get position(): number;
	set position(value: number);
	get buffer(): ArrayBuffer;
	get littleEndian(): boolean;
}

export interface IBufferReader extends IBuffer {
	readUint8(): number;
	readUint16(): number;
	readUint32(): number;
	readUintVar(): number;
	readIntVar(): number;
	readInt8(): number;
	readInt16(): number;
	readInt32(): number;
	readFloat32(): number;
	readFloat64(): number;
	readString(): string;
	readBigInt(): bigint;
	readBuffer(): ArrayBuffer;
	readFlags(count: number): boolean[];
	readBitset(count: number): boolean[];
}

export interface IBufferWriter extends IBuffer {
	get bufferSize(): number;
	writeUint8(value: number): void;
	writeUint16(value: number): void;
	writeUint32(value: number): void;
	writeUintVar(value: number): void;
	writeIntVar(value: number): void;
	writeInt8(value: number): void;
	writeInt16(value: number): void;
	writeInt32(value: number): void;
	writeFloat32(value: number): void;
	writeFloat64(value: number): void;
	writeString(value: string): void;
	writeBigInt(value: bigint): void;
	writeBuffer(value: ArrayBuffer): void;
	writeFlags(value: boolean[]): void;
	writeBitset(value: boolean[]): void;
}
