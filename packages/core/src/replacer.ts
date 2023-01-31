export type ReplacerMethod = (value: any) => any;

export type MapEntries<K, V> = readonly (readonly [K, V])[];

export type ReplacerType = ReplacerMethod | Map<any, any> | MapEntries<any, any>;

export const defaultReplacer: ReplacerMethod = (value) => value;

export function replacerFromTable(table: Map<any, any>): ReplacerMethod {
	return (value) => {
		if (table.has(value)) return table.get(value);
		return value;
	};
}

export function getReplacer(replacerOption: ReplacerType | undefined): ReplacerMethod {
	if (!replacerOption) {
		return defaultReplacer;
	}

	if (typeof replacerOption === 'function') {
		return replacerOption;
	}

	if (replacerOption instanceof Map) {
		return replacerFromTable(replacerOption);
	}

	if (Array.isArray(replacerOption)) {
		return replacerFromTable(new Map(replacerOption));
	}

	throw 'Incorrect replacer type. It must be a function, a map, or entries.';
}
