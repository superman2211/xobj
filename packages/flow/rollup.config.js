import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
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
		external: ['@xobj/buffer'],
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
			file: 'dist/iife/xobj-flow.min.js',
			name: 'xobjCore',
			format: 'iife',
			compact: true,
			sourcemap: true,
		},
		plugins: [
			nodeResolve(),
			sourcemaps(),
			terser(),
		],
	},
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/xobj-flow.es6.min.js',
			name: 'xobjCore',
			format: 'iife',
			compact: true,
			sourcemap: true,
		},
		plugins: [
			nodeResolve(),
			sourcemaps(),
			getBabelOutputPlugin({
				presets: ['@babel/preset-env'],
				allowAllFormats: true,
			}),
			terser(),
		],
	},
];
