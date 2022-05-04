export function isLittleEndian() {
	const array = new Uint8Array(4);
	const view = new Uint32Array(array.buffer);
	view[0] = 1;
	return array[0] === 1;
}
