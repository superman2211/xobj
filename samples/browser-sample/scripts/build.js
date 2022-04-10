const fs = require('fs');

if (!fs.existsSync('dist')) {
	fs.mkdirSync('dist');
}

fs.copyFileSync('src/index.html', 'dist/index.html');
fs.copyFileSync('src/index.js', 'dist/index.js');

fs.copyFileSync(require.resolve('@xobj/core/dist/iife/xobj-core.min.js'), 'dist/xobj-core.min.js');
fs.copyFileSync(require.resolve('@xobj/core/dist/iife/xobj-core.min.js.map'), 'dist/xobj-core.min.js.map');

console.log('Build completed');