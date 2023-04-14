/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        title: `2rem;`,
        paragraph: `1rem;`,
      },
      fontWeight: {
        custom: '400',
      },
      colors: {
        cs: {
          mainblack: '#2F3E39',
          skyblue: '#98D0EF',
          mainred: '#FE6A6A',
          300: '#DFDFDF',
        },
      },
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
