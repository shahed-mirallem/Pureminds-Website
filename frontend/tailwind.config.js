/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-thin': ['Cormorant Garamond', 'serif'],
      },
      fontWeight: {
        'ultra-thin': '100',
      },
    },
  },
  plugins: [],
}
