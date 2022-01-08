export interface IStream {
	get length(): number;
	get position(): number;
	set position(value: number);
	get buffer(): ArrayBuffer;
}
