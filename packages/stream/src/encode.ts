const enum ValueType {
	NULL,
	TRUE,
	FALSE,
	NAN,
	INFINITY_POSITIVE,
	INFINITY_NEGATIVE,
	FLOAT32,
	FLOAT64,
	UINT8,
	UINT16,
	UINT32,
	UINT_VAR,
	INT8,
	INT16,
	INT32,
	INT_VAR,
	STRING,
	ARRAY,
	ARRAY_TYPED,
	ARRAY_BUFFER,
	DATA_VIEW,
	OBJECT,
	SET,
	MAP,
	DATE,
	REG_EXP,
	CUSTOM,
}

const dataBuffer = new ArrayBuffer(8);
const dataBytes = new Uint8Array(dataBuffer);
const dataView = new DataView(dataBuffer);

function writeVarUint(bytes: number[], sourceValue: number) {
	if (sourceValue === 0) {
		bytes.push(0);
		return;
	}

	let value = sourceValue;

	let byte: number = value & 0x0000007f;
	value >>>= 7;
	if (value !== 0) byte |= 0x00000080;
	bytes.push(byte);
	if (value === 0) return;

	byte = value & 0x0000007f;
	value >>>= 7;
	if (value !== 0) byte |= 0x00000080;
	bytes.push(byte);
	if (value === 0) return;

	byte = value & 0x0000007f;
	value >>>= 7;
	if (value !== 0) byte |= 0x00000080;
	bytes.push(byte);
	if (value === 0) return;

	byte = value & 0x0000007f;
	value >>>= 7;
	if (value !== 0) byte |= 0x00000080;
	bytes.push(byte);
	if (value === 0) return;

	byte = value & 0x0000007f;
	value >>>= 7;
	if (value !== 0) byte |= 0x00000080;
	bytes.push(byte);
}

function writeString(bytes: number[], value: string) {
	writeVarUint(bytes, value.length);
	for (let i = 0; i < value.length; i++) {
		writeVarUint(bytes, value.charCodeAt(i));
	}
}

function writeValue(bytes: number[], value: any) {
	if (value === null) {
		bytes.push(ValueType.NULL);
		return;
	}

	if (value === true) {
		bytes.push(ValueType.TRUE);
		return;
	}

	if (value === false) {
		bytes.push(ValueType.FALSE);
		return;
	}

	const type = typeof value;

	switch (type) {
		case 'number':
			bytes.push(ValueType.FLOAT32);
			dataView.setFloat64(0, value);
			bytes.push(...dataBytes);
			break;

		case 'string':
			bytes.push(ValueType.STRING);
			writeString(bytes, value);
			break;

		default:
			if (Array.isArray(value)) {
				bytes.push(ValueType.ARRAY);
				writeVarUint(bytes, value.length);
				for (let i = 0; i < value.length; i++) {
					writeValue(bytes, value[i]);
				}
			} else {
				bytes.push(ValueType.OBJECT);
				const keys = Object.keys(value);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					writeString(bytes, key);
					writeValue(bytes, value[key]);
				}
			}
			break;
	}
}

export function encode(value: any): ArrayBuffer {
	const bytes: number[] = [];
	writeValue(bytes, value);
	return new Uint8Array(bytes);
}
