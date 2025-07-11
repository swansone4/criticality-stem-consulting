/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5c9',
          300: '#8dd1a8',
          400: '#5bb583',
          500: '#2E8B57', // Main academic green
          600: '#2a7a4e',
          700: '#246341',
          800: '#1f5236',
          900: '#1a442e',
        },
        academic: {
          green: '#2E8B57',
          dark: '#1a442e',
          light: '#8dd1a8',
        }
      },
      fontFamily: {
        'times': ['Times New Roman', 'serif'],
        'academic': ['Times New Roman', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'text-reel': 'textReel 18s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        textReel: {
          '0%, 16.67%': { transform: 'translateY(0)' },
          '20%, 36.67%': { transform: 'translateY(-100%)' },
          '40%, 56.67%': { transform: 'translateY(-200%)' },
          '60%, 76.67%': { transform: 'translateY(-300%)' },
          '80%, 96.67%': { transform: 'translateY(-400%)' },
          '100%': { transform: 'translateY(-500%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 