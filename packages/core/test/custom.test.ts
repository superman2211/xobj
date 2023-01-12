/* eslint-disable no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */

import { decode, DecodeContext } from '../src/decode';
import { encode, EncodeContext } from '../src/encode';
import { ValueType } from '../src/types';

enum CustomType {
	POINT = 0,
	UNIT = 1,
}

class Point {
	constructor(public x: number, public y: number) {
	}
}

class Unit {
	constructor(public name: string, public age: number) {
	}
}

interface Game {
	name: string,
	time: number,
	target: Point,
	unit: Unit,
	path: Point[],
}

describe('custom', () => {
	it('should write simple custom objects', () => {
		const source = {
			color: 0xff00ff,
			points: [
				new Point(1, 2),
				new Point(3, 4),
				new Point(5, 6),
			],
		};

		// encode

		function customDetect(value: any): ValueType {
			return value instanceof Point ? ValueType.CUSTOM : ValueType.UNKNOWN;
		}

		function customEncode(value: any, context: EncodeContext) {
			const { writer } = context;

			if (value instanceof Point) {
				writer.writeUint8(0); // custom type
				writer.writeUint8(value.x);
				writer.writeUint8(value.y);
			} else {
				throw `Unknown custom type: ${value}`;
			}
		}

		const buffer = encode(source, { customDetect, customEncode });

		// decode

		function customDecode(context: DecodeContext): any {
			const { reader } = context;
			const type = reader.readUint8() as CustomType;
			switch (type) {
				case 0:
					return new Point(reader.readUint8(), reader.readUint8());
				default:
					throw `Unknown custom type: ${type}`;
			}
		}

		const target = decode(buffer, { customDecode });

		// checking
		expect(target).toEqual(source);
	});

	it('should write few custom objects', () => {
		const source: Game = {
			name: 'path to unit',
			time: 123456789,
			target: new Point(11, 22),
			unit: new Unit('Sergey', 22),
			path: [
				new Point(1, 2),
				new Point(3, 4),
				new Point(5, 6),
			],
		};

		// custom

		function customDetect(value: any): ValueType {
			return (value instanceof Point || value instanceof Unit) ? ValueType.CUSTOM : ValueType.UNKNOWN;
		}

		function customEncode(value: any, context: EncodeContext) {
			const { writer } = context;

			if (value instanceof Point) {
				writer.writeUint8(CustomType.POINT);
				writer.writeUint8(value.x);
				writer.writeUint8(value.y);
			} else if (value instanceof Unit) {
				writer.writeUint8(CustomType.UNIT);
				writer.writeString(value.name);
				writer.writeUint8(value.age);
			} else {
				throw `Unknown custom type: ${value}`;
			}
		}

		function customDecode(context: DecodeContext): any {
			const { reader } = context;
			const type = reader.readUint8() as CustomType;
			switch (type) {
				case CustomType.POINT:
					return new Point(reader.readUint8(), reader.readUint8());
				case CustomType.UNIT:
					return new Unit(reader.readString(), reader.readUint8());
				default:
					throw `Unknown custom type: ${type}`;
			}
		}

		// encode

		const buffer = encode(source, { customDetect, customEncode });

		// decode

		const target: Game = decode(buffer, { customDecode });
		expect(target).toEqual(source);

		expect(target.target.x).toBe(source.target.x);
		expect(target.target.y).toBe(source.target.y);
		expect(target.path.length).toEqual(source.path.length);
		expect(target.unit.name).toEqual(source.unit.name);
		expect(target.unit.age).toEqual(source.unit.age);
		expect(target.unit).toBeInstanceOf(Unit);
		expect(target.target).toBeInstanceOf(Point);
	});
});
