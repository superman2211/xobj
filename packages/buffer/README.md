# @xobj/buffer

Buffer for **Browser** and **NodeJS**. Writing and reading basic types to binary data.

## Install
```shell
yarn add @xobj/buffer
```

## Usage
```typescript
// import reader and writer
import { BufferWriter, BufferReader } from '@xobj/buffer';

// create buffer writer
const writer = new BufferWriter();

// write values
writer.writeInt8(123);
writer.writeString('Test string');

// get result buffer for writing to file or sending to server
const buffer: ArrayBuffer = writer.buffer;

// create buffer reader
const reader = new BufferReader(buffer);

// read values
console.log(reader.readInt8());// 123
console.log(reader.readString()); // Test string
```
You can see more examples in [tests](https://github.com/superman2211/xobj/tree/master/packages/buffer/test).

## Types
- `Number`
	- `uint8`
	- `uint16`
	- `uint32`
	- `uintVar`
	- `int8`
	- `int16`
	- `int32`
	- `intVar`
	- `float32`
	- `float64`
- `BigInt`
- `String`
- `ArrayBuffer`
- `Boolean`
	- `flags`
	- `bitset`

### uintVar / intVar
Variable length integer (1-5 bytes) with max value `2^53-1` (`Number.MAX_SAFE_INTEGER`).
Big bit indicates about next byte.
For signed integer first bit used for sign.

Examples:

```typescript
const writer = new BufferWriter();
writer.writeUintVar(123456);
console.log(writer.buffer);
// ArrayBuffer { [Uint8Contents]: <c0 c4 07>, byteLength: 3 }
```

Other cases:

`uint [01111011] = 123`

`int  [11110111 00000001] = -123`

`uint [11000000 11000100 00000111] = 123456`

`int  [10000001 10001001 00001111] = -123456`

`uint [10101100 11100001 10011011 00000011] = 6746284`

`uint [10111101 10010011 10011100 10101111 00000001] = 367462845`

`uint [11001011 11111001 11010111 11100100 11000000 11111110 11110000 00000110] = 3874627647831243`

### BigInt
BigInt consist of count and bytes array.

| count     | values    |
|-----------|-----------|
| `uintVar` | `uint8[]` |

```typescript
const writer = new BufferWriter();
writer.writeBigInt(9007199326476237462784254740991n);
console.log(writer.buffer);
// ArrayBuffer { [Uint8Contents]: <1a ff 09 91 63 c8 ce 83 c6 00 a8 d4 af 71>, byteLength: 14 }
```

### String
String consist of chars length and chars codes array.

| length    | chars codes |
|-----------|-------------|
| `uintVar` | `uintVar[]` |

```typescript
const writer = new BufferWriter();
writer.writeString('simple string, простая строка, 単純な文字列');
console.log(writer.buffer);
// ArrayBuffer {
//   [Uint8Contents]: 
//     <25 73 69 6d 70 6c 65 20 73 74 72 69 6e 67 2c 20 bf 08 c0 08 
//      be 08 c1 08 c2 08 b0 08 cf 08 20 c1 08 c2 08 c0 08 be 08 ba 
//      08 b0 08 2c 20 d8 a6 01 94 fa 01 ea 60 87 cb 01 d7 b6 01 97 
//      a4 01>,
//   byteLength: 62
// }
```

### ArrayBuffer
ArrayBuffer consist of buffer size and data.

| size      | data      |
|-----------|-----------|
| `uintVar` | `uint8[]` |

### Boolean
`Flags` is a boolean array. It is represented as bits writed as single `uintVar` value.
Maximum array length is 53 (maximum `uintVar` value).

| flags     |
|-----------|
| `uintVar` |

Examples:

```typescript
const writer = new BufferWriter();
writer.writeFlags([true, true, true, false, true, false, false, false, true, true]);
console.log(writer.buffer);
// ArrayBuffer { [Uint8Contents]: <97 06>, byteLength: 2 } 
```

`Bitset` is a boolean array too. But represented as bits in flow of bytes.

| bitset    |
|-----------|
| `uint8[]` |

Examples:
```typescript
const writer = new BufferWriter();
writer.writeBitset([
	true, true, true, false, true, false, true, true,
	false, true, true, false, true, false, true, false,
]);
console.log(writer.buffer);
// ArrayBuffer { [Uint8Contents]: <d7 56>, byteLength: 2 }
```

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
