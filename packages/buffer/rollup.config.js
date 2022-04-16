import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default [
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/cjs/index.js',
			format: 'cjs',
			exports: 'auto',
			sourcemap: 'inline',
		},
		plugins: [
			sourcemaps(),
			getBabelOutputPlugin({
				presets: ['@babel/preset-env'],
			}),
		],
	},
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/xobj-buffer.min.js',
			name: 'xobjBuffer',
			format: 'iife',
			compact: true,
			sourcemap: true,
		},
		plugins: [
			sourcemaps(),
			terser(),
		],
	},
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/xobj-buffer.es6.min.js',
			name: 'xobjBuffer',
			format: 'iife',
			compact: true,
			sourcemap: true,
		},
		plugins: [
			sourcemaps(),
			getBabelOutputPlugin({
				presets: ['@babel/preset-env'],
				allowAllFormats: true,
			}),
			terser(),
		],
	},
];
