/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pure: {
          deep: '#011936',
          electric: '#0055FF',
        },
      },
      fontFamily: {
        'serif-thin': ['"Cormorant Garamond"', 'serif'],
        'sans-heavy': ['"Helvetica Neue"', '"Inter"', '"SF Pro Display"', '"Segoe UI"', 'sans-serif'],
      },
      fontWeight: {
        'ultra-thin': '100',
      },
    },
  },
  plugins: [],
}
