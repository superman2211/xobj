import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from '@rollup/plugin-html';

export default [
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
			html({ title: 'xobj rollup sample' }),
		],
	},
];
