import { ValueType } from '../types';
import { DecoderMethod, DecodeState } from '../decode';

const FLAGS = ['g', 'i', 'm', 'y'];

export function decodeRegExp(state: DecodeState): any {
	const { reader } = state;
	const pattern = reader.readString();
	const flags = reader.readFlags(4);
	const flagsString = flags.map((flag, index) => (flag ? FLAGS[index] : '')).join('');
	const value = new RegExp(pattern, flagsString);
	return value;
}

export function initRegExpDecoders(decoders: Map<ValueType, DecoderMethod>) {
	decoders.set(ValueType.REG_EXP, decodeRegExp);
}
