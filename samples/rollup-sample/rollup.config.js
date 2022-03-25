import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from '@rollup/plugin-html';
import size from 'rollup-plugin-bundle-size';

export default [
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/sample.min.js',
			name: 'xobjSample',
			format: 'iife',
			compact: true,
			sourcemap: true,
		},
		plugins: [
			nodeResolve(),
			sourcemaps(),
			terser(),
			html({ title: 'xobj rollup sample' }),
			size(),
		],
	},
];
