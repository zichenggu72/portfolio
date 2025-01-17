/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', ...defaultTheme.fontFamily.sans],
        oorangeregular: ['Oorangeregular', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} 