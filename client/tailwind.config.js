/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1', // Indigo
          main: '#4f46e5',
          dark: '#3730a3',
        },
        secondary: {
          light: '#f8fafc',
          main: '#e2e8f0',
          dark: '#64748b',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      }
    },
  },
  plugins: [],
}
