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
		],
	},
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/xobj-core.min.js',
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
			file: 'dist/iife/xobj-core.es6.min.js',
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
