// eslint-disable-next-line no-undef
const { encode, decode } = xobjCore;

function log(message) {
	document.write(`<div>${message}</div>`);
	// eslint-disable-next-line no-console
	console.log(message);
}

// some kind of object
const source = {
	name: 'John Doe',
	age: 33,
	gender: 'male',
	children: [
		{ name: 'Jane', age: 12, gender: 'male' },
		{ name: 'Jack', age: 6 },
	],
};

// encode object to binary data
const buffer = encode(source);

// decode binary data to object
const target = decode(buffer);

// use object
log(`target.name: ${target.name}`);// John Doe
log(`target.children[0].age: ${String(target.children[0].age)}`);// 12
