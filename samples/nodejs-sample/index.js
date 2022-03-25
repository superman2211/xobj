const path = require('path');
const fs = require('fs');
const { encode } = require('@xobj/core');

function convertJsonToXobj(source, target) {
	const data = fs.readFileSync(path.resolve(source)).toString();
	const json = JSON.parse(data);
	const buffer = encode(json);
	const bytes = new Uint8Array(buffer);
	fs.writeFileSync(path.resolve(target), bytes);
}

function createOutputDirectory() {
	const directory = path.resolve('./dist');
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}
}

function main() {
	createOutputDirectory();
	convertJsonToXobj('./data/user.json', './dist/user.xobj');
	// eslint-disable-next-line no-console
	console.log('file converted');
}

main();
