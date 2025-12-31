/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
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
        'light-bg': 'rgb(248 250 252)',
        'light-bg-secondary': 'rgb(241 245 249)',
        'light-card': 'rgb(255 255 255)',
      },
    },
  },
  plugins: [],
}

