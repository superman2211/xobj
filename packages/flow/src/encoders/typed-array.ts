import { EncodeContext } from '../encode';

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView;

export function encodeTypedArray(value: TypedArray, context: EncodeContext): void {
	const { writer, links } = context;
	links.push(value);
	const buffer: ArrayBuffer = value.buffer.slice(value.byteOffset, value.byteLength);
	writer.writeBuffer(buffer);
}
