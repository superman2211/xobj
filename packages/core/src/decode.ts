/* eslint-disable no-use-before-define */
import { BufferReader } from '@xobj/buffer';
import { decodeHeader } from './decoders/header';
import { DecodeMethod, DECODERS, decodeValue } from './decoders/index';
import { getReplacer, ReplacerMethod, ReplacerType } from './replacer';
import { FloatQuality, ValueType } from './types';
import { VERSION } from './version';

export interface DecodeContext {
	readonly reader: BufferReader;
	readonly values: any[];
	readonly links: any[];
	readonly decoders: Map<ValueType, DecodeMethod>;
	readonly version: number;
	readonly floatQuality: FloatQuality;
	readonly replacer: ReplacerMethod;
}

export interface DecodeOptions {
	readonly customDecode?: DecodeMethod;
	readonly replacer?: ReplacerType;
}

export function decode(buffer: ArrayBuffer, options?: DecodeOptions): any {
	const reader = new BufferReader(buffer);

	const decoders = new Map(DECODERS);

	if (options?.customDecode) {
		decoders.set(ValueType.CUSTOM, options.customDecode);
	}

	const replacer = getReplacer(options?.replacer);

	const context: DecodeContext = {
		reader,
		values: [],
		links: [],
		decoders,
		version: 0,
		floatQuality: 'double',
		replacer,
	};

	decodeHeader(context);

	if (context.version !== VERSION) {
		throw `Unexpected version: ${context.version}, required version: ${VERSION}`;
	}

	return decodeValue(context);
}
