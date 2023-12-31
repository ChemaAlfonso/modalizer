import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

export default [
	{
		input: 'src/modalizer.ts',
		output: [
			{
				file: 'dist/modalizer.js',
				format: 'es'
			},
			{
				file: 'dist/modalizer.min.js',
				format: 'es',
				plugins: [terser()]
			}
		],
		plugins: [typescript()]
	},
	{
		input: 'src/animateAnimations.ts',
		output: [
			{
				file: 'dist/animateAnimations.js',
				format: 'es'
			},
			{
				file: 'dist/animateAnimations.min.js',
				format: 'es',
				plugins: [terser()]
			}
		],
		plugins: [typescript()]
	}
]
