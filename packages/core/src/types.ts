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
	UINT8,
	UINT16,
	UINT32,
	UINT_VAR,
	INT8,
	INT16,
	INT32,
	INT_VAR,
	FLOAT32,
	FLOAT64,
	STRING,
	ARRAY,
	OBJECT,
	STRUCT,
	ARRAY_BUFFER,
	DATA_VIEW,
	SET,
	MAP,
	DATE,
	REG_EXP,
	CUSTOM,
}

export function isNumberType(type: ValueType): boolean {
	switch (type) {
		case ValueType.UINT8:
		case ValueType.UINT16:
		case ValueType.UINT32:
		case ValueType.UINT_VAR:
		case ValueType.INT8:
		case ValueType.INT16:
		case ValueType.INT32:
		case ValueType.INT_VAR:
		case ValueType.FLOAT32:
		case ValueType.FLOAT64:
			return true;
		default:
			return false;
	}
}

export function isIntegerType(type: ValueType): boolean {
	switch (type) {
		case ValueType.UINT8:
		case ValueType.UINT16:
		case ValueType.UINT32:
		case ValueType.UINT_VAR:
		case ValueType.INT8:
		case ValueType.INT16:
		case ValueType.INT32:
		case ValueType.INT_VAR:
			return true;
		default:
			return false;
	}
}

export function isFloatType(type: ValueType): boolean {
	switch (type) {
		case ValueType.FLOAT32:
		case ValueType.FLOAT64:
			return true;
		default:
			return false;
	}
}

export function isBooleanType(type: ValueType): boolean {
	switch (type) {
		case ValueType.TRUE:
		case ValueType.FALSE:
			return true;
		default:
			return false;
	}
}

export type StructInfo = Map<string, ValueType>;
