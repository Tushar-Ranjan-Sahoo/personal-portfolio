/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#cba864',
          goldLight: '#dfba73',
          goldMuted: '#9e804c',
          goldDark: '#796136',
          bgDark: '#080808',
          sidebarDark: '#0a0a0a',
          cardDark: '#0d0d0c',
          borderDark: '#1f1e1a',
          borderGold: 'rgba(203, 168, 100, 0.25)',
          textMuted: '#8b8478',
        },
        background: '#080808',
        surface: '#0d0d0c',
        accent: '#1f1e1a',
        gold: {
          DEFAULT: '#cba864',
          dark: '#796136',
          light: '#dfba73'
        },
        bronze: '#9e804c',
        platinum: '#E5E4E2'
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        quote: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
      borderColor: {
        'luxury': 'rgba(203, 168, 100, 0.25)',
      }
    },
  },
  plugins: [],
}

