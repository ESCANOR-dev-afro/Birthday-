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
        // Deep Velvet Night Base
        obsidian: {
          950: '#0B0D13',
          900: '#0e1018',
          850: '#111420',
          800: '#151828',
          700: '#1c2136',
          600: '#242944',
        },
        // Soft Radiant Lavender & Electric Violet
        violet: {
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#4c1d95',
          950: '#2e1065',
          glow: 'rgba(168, 85, 247, 0.35)',
        },
        // Warm Champagne / Candlelight Gold
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fde047',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          glow: 'rgba(245, 158, 11, 0.3)',
        },
        // Soft lavender for text
        lavender: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
        },
        // Near-white text
        pearl: {
          50:  '#fefefe',
          100: '#f8f8fc',
          200: '#efeff8',
          300: '#e2e2f0',
        },
        // Glassmorphism dark
        glass: {
          900: 'rgba(11,13,19,0.92)',
          800: 'rgba(17,20,32,0.85)',
          700: 'rgba(21,24,40,0.75)',
          600: 'rgba(28,33,54,0.65)',
        },
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
        'card':     '0 24px 60px -12px rgba(0,0,0,0.9), 0 0 30px rgba(168,85,247,0.12)',
        'halo':     '0 0 60px rgba(168,85,247,0.4), 0 0 25px rgba(192,132,252,0.3)',
        'gold-glow':'0 0 30px rgba(245,158,11,0.35)',
        'violet-glow':'0 0 35px rgba(168,85,247,0.45)',
        'inner-soft':'inset 0 1px 1px rgba(255,255,255,0.08)',
      },
      animation: {
        'ambient-float': 'ambientFloat 9s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 5s ease-in-out infinite',
        'shimmer-slow': 'shimmer 7s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float-up': 'floatUp 1.2s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        ambientFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':       { opacity: '0.9' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.3)' },
          '50%':       { boxShadow: '0 0 45px rgba(168,85,247,0.7), 0 0 20px rgba(245,158,11,0.3)' },
        },
        floatUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}
