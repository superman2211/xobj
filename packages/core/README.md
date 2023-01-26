# @xobj/core

[![Build](https://github.com/superman2211/xobj/workflows/build/badge.svg)](https://github.com/superman2211/xobj/actions/workflows/build.yml)
[![npm](https://badge.fury.io/js/@xobj%2Fcore.svg)](https://badge.fury.io/js/@xobj%2Fcore) 
[![Downloads](https://img.shields.io/npm/dw/auph)](https://www.npmjs.com/package/@xobj/core) 
[![Coverage](https://superman2211.github.io/xobj/packages/core/coverage/badges.svg)](https://superman2211.github.io/xobj/packages/core/coverage/lcov-report/)

Decoding and encoding **JavaScript** / **TypeScript** objects to compact binary format.

Available basic types:
- `null`
- `undefined`
- `Number` [examples](https://github.com/superman2211/xobj/blob/master/packages/core/test/numbers.test.ts)
- `BigInt` [examples](https://github.com/superman2211/xobj/blob/master/packages/core/test/bigint.test.ts)
- `Boolean`
- `String`
- `Symbol` [examples](https://github.com/superman2211/xobj/blob/master/packages/core/test/symbol.test.ts)
- `Object`
- `Array`
- `Function` [examples](https://github.com/superman2211/xobj/blob/master/packages/core/test/function.test.ts)
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

Recursive objects links are also supported.

You can see more examples in [tests](https://github.com/superman2211/xobj/tree/master/packages/core/test).

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
console.log(target!.children![0].age);// 12
```

Custom types usage:
```typescript
import { encode, decode, EncodeContext, DecodeContext, ValueType } from '@xobj/core';

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

function customDetect(value: any): ValueType {
	if (value instanceof Point) {
		return ValueType.CUSTOM;
	}
	return ValueType.UNKNOWN;
}

function customEncode(value: any, context: EncodeContext) {
	const { writer } = context;

	if (value instanceof Point) {
		writer.writeUint8(CustomType.POINT);
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
		case CustomType.POINT:
			return new Point(
				reader.readUint8(),
				reader.readUint8()
			);
		default:
			throw `Unknown custom type: ${type}`;
	}
}

const target = decode(buffer, { customDecode });

// use object
console.log(target.points[0].x) // 1
console.log(target.points[0].y) // 2
```
See more about [BufferWriter and BufferReader](https://github.com/superman2211/xobj/tree/master/packages/buffer)

Encode options
```typescript
encode(value, {
	bufferSize, // buffer starter size
	customDetect, // function for custom type detection
	customEncode, // function for custom type encoding
	floatQuality, // encoding float quality : 'double' | 'single' | number (default is 'double')
});
```
The `floatQuality` parameter allows you to select the encoding type for floating point numbers.

Encoding all float numbers into `float64` format (8 bytes)
```typescript
encode(value); // by default float quality is 'double'
```
Encoding all float numbers into `float32` format (4 bytes)
```typescript
encode(value, { floatQuality: 'single' });
```
Encoding all float numbers into `intVar` format (1-9+ bytes).
In this case `floatQuality` is number (**divider** / **multiplier**). For decoding it is used as **multiplier**, and for decoding it is used as **divider**. For example:
```typescript
const buffer = encode({ x: 123.456, y: -3456.789 }, { floatQuality: 100 });
// 'x' and 'y' will be transformed to 'integer' and encoded as 'intVar' 
// floor(123.456 * 100) => 12345 => write intVar to 2 bytes
// floor(-3456.789 * 100) => -345678 => write intVar to 3 bytes

const value = decode(buffer);
// 'x' and 'y' will be decoded as 'intVar' and transformed to 'float' 
// read intVar from 2 bytes => 12345 / 100 => 123.45
// read intVar from 3 bytes => -345678 / 100 => -3456.78
```

Decode options
```typescript
decode(value, {
	customDecode, // function for custom type decoding
});
```

You can see more examples in [tests](https://github.com/superman2211/xobj/tree/master/packages/core/test).

Check out integration [samples](https://github.com/superman2211/xobj/tree/master/samples).

## File format (xobj)
Coming soon

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
