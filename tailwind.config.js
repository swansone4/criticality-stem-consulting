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
          50: '#f5f7fa',
          100: '#e0e0e0', // Light gray for borders/subtext
          200: '#cfd8dc',
          300: '#b0bec5',
          400: '#90a4ae',
          500: '#4F7FF0', // Bright blue (primary accent)
          600: '#3a5fcf',
          700: '#2546b8',
          800: '#1a2e4f', // Deep navy (primary text)
          900: '#1A1A2E', // Deepest navy/black
        },
        accent: {
          blue: '#4F7FF0',
          orange: '#FF6B00',
        },
        background: '#FFFFFF',
        border: '#E0E0E0',
        text: {
          primary: '#1A1A2E',
          secondary: '#4F7FF0',
          highlight: '#FF6B00',
          sub: '#90a4ae',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'SF Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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