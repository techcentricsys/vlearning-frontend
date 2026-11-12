/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-container-lowest': '#ffffff', 'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff', 'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe', 'surface-variant': '#d3e4fe',
        surface: '#f8f9ff', background: '#f8f9ff', 'on-surface': '#0b1c30',
        'on-surface-variant': '#464554', 'on-background': '#0b1c30',
        'outline-variant': '#c7c4d7', outline: '#777586',
        primary: '#2a14b4', 'primary-container': '#4338ca',
        'on-primary': '#ffffff', 'primary-fixed': '#e3dfff',
        secondary: '#006a61', 'secondary-container': '#86f2e4',
        'on-secondary': '#ffffff', 'on-primary-fixed': '#100069'
      }
    }
  },
  plugins: []
};
