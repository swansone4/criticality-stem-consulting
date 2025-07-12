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
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d', // Main academic gray
          600: '#495057',
          700: '#343a40',
          800: '#212529', // Deep charcoal
          900: '#1a1a1a', // Almost black
        },
        accent: {
          navy: '#2c3e50',
          burgundy: '#8b2635',
          gold: '#d4af37',
        },
        background: '#ffffff',
        border: '#dee2e6',
        text: {
          primary: '#212529',
          secondary: '#6c757d',
          accent: '#8b2635',
          muted: '#6c757d',
        },
        academic: {
          cream: '#f8f6f1',
          parchment: '#f5f5dc',
          charcoal: '#2c3e50',
          burgundy: '#8b2635',
        }
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
        academic: ['Times New Roman', 'Georgia', 'serif'],
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