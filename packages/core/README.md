# @xobj/core

Decoding and encoding **JavaScript** / **TypeScript** objects to compact binary format.

Available basic types:
- `null`
- `undefined`
- `Number`
- `BigInt`
- `Boolean`
- `String`
- `Object`
- `Array`
- `Map`
- `Set`
- `ArrayBuffer`
- `TypedArray`:
	- `Uint8ClampedArray`
	- `Uint8Array`
	- `Uint16Array`
	- `Uint32Array`
	- `Int8Array`
	- `Int16Array`
	- `Int32Array`
	- `Float32Array`
	- `Float64Array`
	- `DataView`
- `RegExp`
- `Date`

For all basic types used optimization for data minification.

Also you can use custom types.

## Install
```shell
yarn add @xobj/core
```

## Usage
Basic usage with default types:
```typescript
// import library methods
import { encode, decode } from '@xobj/core';

interface User {
	name: string,
	age: number,
	gender?: 'male' | 'female',
	children?: User[],
}

// some kind of object
const source: User = {
	name: 'John Doe',
	age: 33,
	gender: 'male',
	children: [
		{ name: 'Jane', age: 12, gender: 'male' },
		{ name: 'Jack', age: 6 },
	],
};

// encode object to binary data
const buffer: ArrayBuffer = encode(source);

// decode binary data to object
const target: User = decode(buffer);

// use object
console.log(target.name);// John Doe
console.log(target?.children[0]?.age);// 12
```

Custom types usage:
```typescript
class Point {
	constructor(public x: number, public y: number) {
	}
}

enum CustomType { POINT = 0 }

const source = {
	color: 0xff00ff,
	points: [
		new Point(1, 2),
		new Point(3, 4),
		new Point(5, 6),
	],
};

// encode

function customDetector(state: EncodeState, value: any): ValueType {
	if (value instanceof Point) {
		return ValueType.CUSTOM;
	}
	return ValueType.UNKNOWN;
}

function customEncoder(state: EncodeState, value: any) {
	const { writer } = state;

	if (value instanceof Point) {
		writer.writeUint8(CustomType.POINT);
		writer.writeUint8(value.x);
		writer.writeUint8(value.y);
	} else {
		throw `Unknown custom type: ${value}`;
	}
}

const encoders = new Map([[ValueType.CUSTOM, customEncoder], ...DEFAULT_ENCODERS]);
const detectors = [customDetector, ...DEFAULT_DETECTORS];

const buffer = encode(source, { encoders, detectors });
expect(buffer.byteLength).toBe(33);

// decode

function customDecoder(state: DecodeState): any {
	const { reader } = state;
	const type = reader.readUint8() as CustomType;
	switch (type) {
		case CustomType.POINT:
			return new Point(reader.readUint8(), reader.readUint8());
		default:
			throw `Unknown custom type: ${type}`;
	}
}

const decoders = new Map([[ValueType.CUSTOM, customDecoder], ...DEFAULT_DECODERS]);

const target = decode(buffer, { decoders });

// use object
console.log(target.points[0].x) // 1
console.log(target.points[0].y) // 2
```

You can see more examples in [tests](https://github.com/AntonovSergey2211/xobj/tree/master/packages/core/test).

## File format (xobj)


## Development
Install all dependencies
```shell
yarn
```

Build project
```shell
yarn build
```

Test project
```shell
yarn test
```

Generate coverage report
```shell
yarn coverage
```

Check code quality
```shell
yarn lint
```
