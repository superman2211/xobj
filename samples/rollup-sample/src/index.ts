import { encode, decode } from '@xobj/core';

function log(message: string) {
	document.write(`<div>${message}</div>`);
}

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
log(`target.name: ${target.name}`);// John Doe
log(`target.children[0]: ${String(target!.children![0].age)}`);// 12
