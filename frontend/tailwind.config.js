/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5ee',
          100: '#c8e6d4',
          200: '#a5d6ba',
          300: '#7cc69e',
          400: '#5ab985',
          500: '#1a6b4a',
          600: '#155a3e',
          700: '#0f4530',
          800: '#0a3022',
          900: '#051c14',
        },
        gold: {
          50: '#fdf3e0',
          100: '#fae3b3',
          200: '#f6d280',
          300: '#f2c14d',
          400: '#eeb526',
          500: '#c8962e',
          600: '#a87822',
          700: '#875c18',
          800: '#65420f',
          900: '#442a07',
        },
        parchment: '#f7f5f0',
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};