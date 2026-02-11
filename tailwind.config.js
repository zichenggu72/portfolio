const defaultTheme = require('tailwindcss/defaultTheme');

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
      spacing: {
        'space-0': '0px',
        'space-025': '0.125rem',   // 2px
        'space-050': '0.25rem',    // 4px
        'space-075': '0.375rem',   // 6px
        'space-100': '0.5rem',     // 8px (base unit)
        'space-150': '0.75rem',    // 12px
        'space-200': '1rem',       // 16px
        'space-250': '1.25rem',    // 20px
        'space-300': '1.5rem',     // 24px
        'space-400': '2rem',       // 32px
        'space-500': '2.5rem',     // 40px
        'space-600': '3rem',       // 48px
        'space-800': '4rem',       // 64px
        'space-1000': '5rem',      // 80px
      },
    },
  },
  plugins: [],
} 