import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'dist/esm/index.js',
	output: [
		{
			file: 'dist/cjs/index.js',
			format: 'cjs',
			exports: 'auto',
			sourcemap: 'inline',
		},
		{
			file: 'dist/iife/xobj-buffer.min.js',
			name: 'xobjBuffer',
			format: 'iife',
			compact: true,
			sourcemap: true,
			plugins: [terser()],
		},
	],
	plugins: [sourcemaps()],
};
