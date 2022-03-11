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

For all basic types applied optimization for data minification.

Also you can use custom types.

## Install
```shell
yarn add @xobj/core
```

## Usage
```javascript
// import library methods
import { encode, decode } from '@xobj/core';

// some kind of object
const source: User = {
	name: 'John Doe',
	age: 33,
	gender: 'male',
	children: [
		{ name: 'Jane', age: 12 },
		{ name: 'Jack', age: 6 },
	],
};

// encode object to binary data
const buffer: ArrayBuffer = encode(source);

// decode binary data to object
const target: User = decode(buffer);

// use object
console.log(target.name);// John Doe
```
You can see more examples in [tests](test).

Custom type [example](test/custom.test.ts).

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
