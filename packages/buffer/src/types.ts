export interface IBuffer {
	get length(): number;
	get bytesAvailable(): number;
	get position(): number;
	set position(value: number);
	get buffer(): ArrayBuffer;
}
