import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'dist/esm/index.js',
	output: [
		{
			file: 'dist/cjs/index.js',
			format: 'cjs',
			exports: 'auto',
			sourcemap: 'inline',
			plugins: [sourcemaps()],
		},
		{
			file: 'dist/iife/xobj-core.min.js',
			name: 'xobjCore',
			format: 'iife',
			compact: true,
			sourcemap: true,
			plugins: [
				nodeResolve(),
				sourcemaps(),
				terser(),
			],
		},
	],
};
