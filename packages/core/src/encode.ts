/* eslint-disable no-use-before-define */
import { BufferWriter, IBufferWriter } from '@xobj/buffer';
import { DetectMethod, DETECTORS } from './detectors/index';
import { EncodeMethod, ENCODERS, encodeValue } from './encoders/index';
import { ValueType } from './types';

export interface EncodeContext {
	readonly writer: IBufferWriter,
	readonly values: any[];
	readonly links: any[];
	readonly detectors: DetectMethod[];
	readonly encoders: Map<ValueType, EncodeMethod>,
}

export interface EncodeOptions {
	readonly bufferSize?: number;
	readonly debug?: boolean;
	readonly customDetect?: DetectMethod;
	readonly customEncode?: EncodeMethod;
}

export function encode(value: any, options?: EncodeOptions): ArrayBuffer {
	const bufferSize = options?.bufferSize ?? 1024;

	const writer = new BufferWriter(bufferSize);

	const detectors = DETECTORS.slice();
	if (options?.customDetect) {
		detectors.unshift(options.customDetect);
	}

	const encoders = new Map(ENCODERS);
	if (options?.customEncode) {
		encoders.set(ValueType.CUSTOM, options?.customEncode);
	}

	const context: EncodeContext = {
		writer,
		values: [],
		links: [],
		detectors,
		encoders,
	};

	encodeValue(value, context);

	return writer.buffer;
}
