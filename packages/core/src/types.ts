export const enum ValueType {
	UNKNOWN,
	ANY,
	NULL,
	UNDEFINED,
	NAN,
	FALSE,
	TRUE,
	POSITIVE_INFINITY,
	NEGATIVE_INFINITY,
	INT,
	FLOAT,
	BIGINT,
	STRING,
	ARRAY,
	OBJECT,
	FUNCTION,
	END,
	SYMBOL,
	SET,
	MAP,
	ARRAY_BUFFER,
	UINT8_CLAMPED_ARRAY,
	UINT8_ARRAY,
	UINT16_ARRAY,
	UINT32_ARRAY,
	INT8_ARRAY,
	INT16_ARRAY,
	INT32_ARRAY,
	INT_VAR_ARRAY,
	FLOAT32_ARRAY,
	FLOAT64_ARRAY,
	DATA_VIEW,
	DATE,
	REG_EXP,
	VALUE_INDEX,
	VALUE_INDEX_LAST,
	LINK_INDEX,
	LINK_INDEX_LAST,
	CUSTOM,
}

export function isBooleanType(type: ValueType): boolean {
	return type === ValueType.TRUE || type === ValueType.FALSE;
}

export type FloatQuality = 'single' | 'double' | number;

export type Header = {
	version: number,
	floatQuality: FloatQuality,
}
