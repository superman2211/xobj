import { DecodeContext } from '../decode';

export function decodeUint8ClampedArray(context: DecodeContext): Uint8ClampedArray {
	const { reader, links } = context;
	const array = new Uint8ClampedArray(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeUint8Array(context: DecodeContext): Uint8Array {
	const { reader, links } = context;
	const array = new Uint8Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeUint16Array(context: DecodeContext): Uint16Array {
	const { reader, links } = context;
	const array = new Uint16Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeUint32Array(context: DecodeContext): Uint32Array {
	const { reader, links } = context;
	const array = new Uint32Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeInt8Array(context: DecodeContext): Int8Array {
	const { reader, links } = context;
	const array = new Int8Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeInt16Array(context: DecodeContext): Int16Array {
	const { reader, links } = context;
	const array = new Int16Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeInt32Array(context: DecodeContext): Int32Array {
	const { reader, links } = context;
	const array = new Int32Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeFloat32Array(context: DecodeContext): Float32Array {
	const { reader, links } = context;
	const array = new Float32Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeFloat64Array(context: DecodeContext): Float64Array {
	const { reader, links } = context;
	const array = new Float64Array(reader.readBuffer());
	links.push(array);
	return array;
}

export function decodeDataView(context: DecodeContext): DataView {
	const { reader, links } = context;
	const array = new DataView(reader.readBuffer());
	links.push(array);
	return array;
}
