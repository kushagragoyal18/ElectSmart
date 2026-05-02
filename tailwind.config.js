/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#101828',
        muted: '#667085',
        civic: {
          navy: '#0B3C91',
          blue: '#1455A3',
          saffron: '#f08b2f',
          green: '#137a4b',
          paper: '#f6f8fb',
          line: '#d9e2ef',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(16, 24, 40, 0.08)',
      },
    },
  },
  plugins: [],
};
