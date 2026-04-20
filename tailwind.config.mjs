/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef7ff',
          100: '#d9ecff',
          200: '#bcdfff',
          300: '#8ecaff',
          400: '#59aaff',
          500: '#3388f7',
          600: '#1f69e4',
          700: '#1a53c2',
          800: '#1b469d',
          900: '#1b3d7c',
          950: '#13264d'
        },
        ink: {
          50:  '#f7f7f8',
          100: '#eeeef0',
          200: '#d7d8dc',
          300: '#b3b5bd',
          400: '#898c98',
          500: '#6d707c',
          600: '#565965',
          700: '#464852',
          800: '#3b3d45',
          900: '#26272d',
          950: '#151519'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
