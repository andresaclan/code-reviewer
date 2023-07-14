/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'black-900': '#19181B',
				black: '#0A0B0A',
				dark: '#26262A',
				'dark-800': '#2E2E33'
			},
			fontFamily: ['Inter', 'sans-serif']
		}
	},
	plugins: []
};
