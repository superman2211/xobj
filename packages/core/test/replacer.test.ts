/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('replacer', () => {
	it('should replace function and symbol via function', () => {
		const id = Symbol('id');

		const source = {
			x: 1,
			update(value: number) {
				this.x += value;
			},
			id,
		};

		const buffer = encode(source, {
			replacer: (value) => {
				if (value === id) return 'id-0';
				if (value === source.update) return 345678;
				return value;
			},
		});

		const target = decode(buffer, {
			replacer: (value) => {
				if (value === 'id-0') return id;
				if (value === 345678) return source.update;
				return value;
			},
		});

		expect(target).toEqual(source);
	});

	it('should replace function and symbol via map table', () => {
		const id = Symbol('id');

		const source = {
			x: 1,
			update(value: number) {
				this.x += value;
			},
			id,
		};

		const buffer = encode(source, {
			replacer: new Map<any, any>([
				[id, 'id-0'],
				[source.update, 345678],
			]),
		});

		const target = decode(buffer, {
			replacer: new Map<any, any>([
				['id-0', id],
				[345678, source.update],
			]),
		});

		expect(target).toEqual(source);
	});

	it('should replace function and symbol via entries', () => {
		const id = Symbol('id');

		const source = {
			x: 1,
			update(value: number) {
				this.x += value;
			},
			id,
		};

		const buffer = encode(source, {
			replacer: [
				[id, 'id-0'],
				[source.update, 345678],
			],
		});

		const target = decode(buffer, {
			replacer: [
				['id-0', id],
				[345678, source.update],
			],
		});

		expect(target).toEqual(source);
	});

	it('should throw an error when incorrect replacer', () => {
		const source = { x: 1, y: 2 };

		const buffer = encode(source);

		const act = () => {
			decode(buffer, { replacer: 'incorrect replacer' as any as Map<any, any> });
		};

		expect(act).toThrow('Incorrect replacer type. It must be a function, a map, or entries.');
	});
});
