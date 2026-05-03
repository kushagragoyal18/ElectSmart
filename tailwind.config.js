/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#212529',
        muted: '#6c757d',
        eci: {
          blue: '#000080',
          saffron: '#FF9933',
          green: '#138808',
          white: '#FFFFFF',
          teal: '#17a2b8',
          pink: { bg: '#fff5f7', border: '#fbcfe8', accent: '#ff64d1' },
          green_light: { bg: '#f0fdf4', border: '#bbf7d0', accent: '#64c118' },
          red: { bg: '#fef2f2', border: '#fecaca', accent: '#ef4040' },
          cyan: { bg: '#ecfeff', border: '#a5f3fc', accent: '#2bb9e9' },
          yellow: { bg: '#fffbeb', border: '#fef3c7', accent: '#854d0e' },
          sky: { bg: '#f0f9ff', border: '#bae6fd', accent: '#17a2b8' },
        },
        civic: {
          navy: '#000080',
          blue: '#000080',
          saffron: '#FF9933',
          green: '#138808',
          paper: '#f8f9fa',
          line: '#dee2e6',
        },
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
