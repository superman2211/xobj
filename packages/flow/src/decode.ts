/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { DecodeMethod, DECODERS, decodeValue } from './decoders/index';
import { ValueType } from './types';

export interface DecodeContext {
	readonly reader: BufferReader;
	readonly values: any[];
	readonly links: any[];
	readonly decoders: Map<ValueType, DecodeMethod>;
}

export interface DecodeOptions {
	readonly debug?: boolean;
	readonly customDecode?: DecodeMethod;
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new BufferReader(buffer);

	const decoders = new Map(DECODERS);

	if (options?.customDecode) {
		decoders.set(ValueType.CUSTOM, options.customDecode);
	}

	const context: DecodeContext = {
		reader,
		values: [],
		links: [],
		decoders,
	};

	return decodeValue(context);
}
