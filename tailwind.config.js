/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-dark': 'rgb(9 12 19)',
        'netflix-dark-lighter': 'rgb(15 20 30)',
        'netflix-dark-card': 'rgb(20 25 35)',
      },
    },
  },
  plugins: [],
}

