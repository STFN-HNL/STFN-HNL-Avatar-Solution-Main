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
        accent: '#CAD3AC', // Updated to exact Heinrich Co. sage green
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
      // Heinrich Co. inspired animations
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'sophisticated': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      // Premium shadows
      boxShadow: {
        'heinrich': '0 10px 40px rgba(27, 29, 30, 0.1)',
        'heinrich-hover': '0 15px 50px rgba(27, 29, 30, 0.15)',
        'paper': '0 4px 20px rgba(193, 185, 173, 0.2)',
        'stack': '0 8px 32px rgba(27, 29, 30, 0.12)',
      },
    },
  },
  darkMode: "class",
}
