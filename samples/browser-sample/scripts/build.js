const fs = require('fs');

if (!fs.existsSync('dist')) {
	fs.mkdirSync('dist');
}

fs.copyFileSync('src/index.html', 'dist/index.html');
fs.copyFileSync('src/index.js', 'dist/index.js');

fs.copyFileSync(require.resolve('@xobj/core/dist/iife/xobj-core.es6.min.js'), 'dist/xobj-core.es6.min.js');
fs.copyFileSync(require.resolve('@xobj/core/dist/iife/xobj-core.es6.min.js.map'), 'dist/xobj-core.es6.min.js.map');

// eslint-disable-next-line no-console
console.log('Build completed');
