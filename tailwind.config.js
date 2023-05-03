/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontWeight: {
        400: 400,
        500: 500,
        700: 700,
      },
    },
  },
  plugins: [],
}
