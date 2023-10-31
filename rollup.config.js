import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

export default {
	input: 'src/modalizer.ts',
	output: [
		{
			file: 'dist/modalizer.js',
			format: 'es'
		}
	],
	plugins: [typescript(), terser()]
}
