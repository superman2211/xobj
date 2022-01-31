import { EncoderMethod, EncodeState } from '../encode';
import { ValueType } from '../types';

export function encodeAny(state: EncodeState, value: any) {
	const type = state.detect(state, value);

	if (type === ValueType.UNKNOWN) {
		throw `Unable to detect object type: ${value}`;
	}

	state.writer.writeUint8(type);

	const encoder = state.encoders.get(type);

	if (!encoder) {
		throw `Encoder method not found for object: ${value} with type: ${type}`;
	}

	encoder(state, value);
}

export function initAnyEncoders(encoders: Map<ValueType, EncoderMethod>) {
	encoders.set(ValueType.ANY, encodeAny);
}
