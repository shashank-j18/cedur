/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488', // Primary Teal
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        navy: {
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 35px -10px rgba(13, 148, 136, 0.15)',
      },
    },
  },
  plugins: [],
};
