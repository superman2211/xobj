/* eslint-disable no-use-before-define */
import { StreamReader } from '@jsbyte/stream';
import { ValueType } from './ValueType';
import { initEmptyDecoders } from './decoders/empty';
import { initNumberDecoders } from './decoders/number';
import { initStringDecoders } from './decoders/string';
import { initArrayDecoders } from './decoders/array';
import { initBooleanDecoders } from './decoders/boolean';
import { initObjectDecoders } from './decoders/object';

export type DecoderMethod = (reader: StreamReader, options: DecodeOptions) => any;

export interface DecodeOptions {
	decoders: Map<number, DecoderMethod>;
}

export const DEFAULT_DECODERS = new Map<ValueType, DecoderMethod>();

initAnyDecoders(DEFAULT_DECODERS);
initEmptyDecoders(DEFAULT_DECODERS);
initBooleanDecoders(DEFAULT_DECODERS);
initNumberDecoders(DEFAULT_DECODERS);
initStringDecoders(DEFAULT_DECODERS);
initArrayDecoders(DEFAULT_DECODERS);
initObjectDecoders(DEFAULT_DECODERS);

function initAnyDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.ANY, decodeAny);
}

export function decodeAny(reader: StreamReader, options: DecodeOptions): any {
	const type = reader.readUint8() as ValueType;
	const decoder = options.decoders.get(type);

	if (!decoder) {
		throw `Decoder method not found for object type: ${type}`;
	}

	return decoder(reader, options);
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const decodeOptions: DecodeOptions = {
		decoders: DEFAULT_DECODERS,
		...options,
	};

	const reader = new StreamReader(buffer);
	const value = decodeAny(reader, decodeOptions);
	return value;
}
