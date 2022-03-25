/* eslint-disable no-unused-expressions */
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import size from 'rollup-plugin-bundle-size';
import copy from 'rollup-plugin-copy';

export default [
	{
		input: 'dist/esm/index.js',
		output: {
			file: 'dist/iife/sample.min.js',
			name: 'xobjSample',
			format: 'iife',
			compact: true,
			sourcemap: true,
			globals: { '@xobj/core': 'xobjCore' },
		},
		external: ['@xobj/core'],
		plugins: [
			sourcemaps(),
			terser(),
			copy({
				targets: [
					{ src: 'src/index.html', dest: 'dist/iife' },
					{ src: require.resolve('@xobj/core/dist/iife/xobj-core.min.js'), dest: 'dist/iife' },
					{ src: require.resolve('@xobj/core/dist/iife/xobj-core.min.js.map'), dest: 'dist/iife' },
				],
			}),
			size(),
		],
	},
];
