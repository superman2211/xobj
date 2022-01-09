import { Encoder } from './Encoder';

export function encode(value: any): ArrayBuffer {
	const encoder = new Encoder();
	encoder.writeValue(value);
	return encoder.writer.buffer;
}
