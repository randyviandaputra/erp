/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937', 
        secondary: '#111827', 
        accent: '#4f46e5', 
      },
    },
  },
  plugins: [],
};
