/* eslint-disable no-use-before-define */
import { BufferWriter, IBufferWriter } from '@xobj/buffer';
import { DetectMethod, DETECTORS } from './detectors/index';
import { EncodeMethod, ENCODERS, encodeValue } from './encoders/index';
import { encodeHeader } from './encoders/header';
import { FloatType, ValueType } from './types';

export interface EncodeContext {
	readonly writer: IBufferWriter,
	readonly values: any[];
	readonly links: any[];
	readonly detectors: DetectMethod[];
	readonly encoders: Map<ValueType, EncodeMethod>,
	readonly floatType: FloatType;
}

export interface EncodeOptions {
	readonly bufferSize?: number;
	readonly customDetect?: DetectMethod;
	readonly customEncode?: EncodeMethod;
	readonly floatType?: FloatType;
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

	const floatType = options?.floatType ?? 'double';

	const context: EncodeContext = {
		writer,
		values: [],
		links: [],
		detectors,
		encoders,
		floatType,
	};

	encodeHeader(context);

	encodeValue(value, context);

	return writer.buffer;
}
