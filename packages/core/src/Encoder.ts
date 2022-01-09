import { StreamWriter } from '@jsbyte/stream';
import { encodeArray } from './encoders/array';
import { encodeBoolean } from './encoders/boolean';
import { encodeEmpty } from './encoders/empty';
import { encodeNumber } from './encoders/number';
import { encodeObject } from './encoders/object';
import { encodeString } from './encoders/string';

// eslint-disable-next-line no-use-before-define
export type EncoderMethod = (encoder: Encoder, value: any) => boolean;

export const DEFAULT_ENCODERS: EncoderMethod[] = [
	encodeEmpty,
	encodeBoolean,
	encodeNumber,
	encodeString,
	encodeArray,
	encodeObject,
];

export interface EncoderOptions {
	encoders: EncoderMethod[];
}

export class Encoder {
	readonly options: EncoderOptions;
	readonly writer: StreamWriter;

	constructor(options?: EncoderOptions) {
		this.options = {
			encoders: DEFAULT_ENCODERS,
			...options,
		};

		this.writer = new StreamWriter();
	}

	writeValue(value: any) {
		for (const encoder of this.options.encoders) {
			if (encoder(this, value)) {
				return;
			}
		}
		throw `Encoder method not found for object: ${value}`;
	}
}
