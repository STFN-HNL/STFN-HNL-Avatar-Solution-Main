/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1B1D1E',
          light: '#C1B9AD',
        },
        accent: '#CAD5AC',
        neutral: '#F2F2F2',
        // Keep some essential grays for subtle UI elements
        gray: {
          50: '#F2F2F2',
          100: '#E5E5E5',
          200: '#C1B9AD',
          300: '#A39A8D',
          400: '#857C6F',
          500: '#675E51',
          600: '#4A4033',
          700: '#2C2215',
          800: '#1B1D1E',
          900: '#0D0F10',
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  darkMode: "class",
}
