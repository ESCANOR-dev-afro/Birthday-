/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        espresso: {
          950: '#140a08',
          900: '#1c0f0d',
          850: '#251310',
          800: '#2e1814',
          700: '#42221c',
          600: '#5a2e26',
        },
        mahogany: {
          950: '#120807',
          900: '#1a0d0b',
          850: '#231210',
          800: '#2d1714',
          700: '#3d1f1b',
          600: '#542b26',
        },
        crimson: {
          300: '#fda4af',
          400: '#fb7185',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
          800: '#881337',
          900: '#4c0b1b',
          950: '#2e040f',
          glow: 'rgba(190, 18, 60, 0.28)',
        },
        copper: {
          100: '#fdf3ed',
          200: '#fae2d5',
          300: '#f4c2ab',
          400: '#f0a282',
          500: '#e07a5f',
          600: '#c85a38',
          700: '#a84323',
          800: '#873318',
          900: '#6a2812',
          glow: 'rgba(224, 122, 95, 0.3)',
        },
        terracotta: {
          300: '#e89f88',
          400: '#d97d62',
          500: '#c85d40',
          600: '#a6472d',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf5ef',
          200: '#f5ece1',
          300: '#ede0d0',
          400: '#dec8b0',
        },
        noir: {
          950: '#140a08',
          900: '#1c0f0d',
          850: '#251310',
          800: '#2e1814',
          700: '#42221c',
          600: '#5a2e26',
        },
        gold: {
          300: '#f4c2ab',
          400: '#f0a282',
          500: '#e07a5f',
          600: '#c85a38',
          glow: 'rgba(224, 122, 95, 0.25)',
        },
        rose: {
          300: '#fda4af',
          400: '#fb7185',
          500: '#e11d48',
          glow: 'rgba(225, 29, 72, 0.22)',
        },
        bronze: {
          300: '#f4c2ab',
          400: '#e07a5f',
          500: '#c85a38',
          600: '#a84323',
        },
        champagne: {
          100: '#faf5ef',
          200: '#f5ece1',
          300: '#f4c2ab',
          400: '#e07a5f',
          500: '#c85a38',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
      },
      boxShadow: {
        'invitation': '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(190, 18, 60, 0.15), 0 0 15px rgba(224, 122, 95, 0.12)',
        'halo': '0 0 60px rgba(190, 18, 60, 0.3), 0 0 25px rgba(224, 122, 95, 0.35)',
        'hairline': 'inset 0 0 0 1px rgba(224, 122, 95, 0.3)',
        'inner-bevel': 'inset 0 1px 1px 0 rgba(255, 245, 235, 0.15)',
        'crimson-glow': '0 0 30px rgba(190, 18, 60, 0.4), inset 0 0 15px rgba(224, 122, 95, 0.2)',
        'copper-glow': '0 0 25px rgba(224, 122, 95, 0.35)',
      },
      animation: {
        'ambient-float': 'ambientFloat 8s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 5s ease-in-out infinite',
        'shimmer-slow': 'shimmer 7s linear infinite',
      },
      keyframes: {
        ambientFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
