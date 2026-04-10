/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wilco: {
          orange: '#E8420A',
          'orange-dark': '#B5310A',
          black: '#0D0D0D',
          gray90: '#1C1C1C',
          gray70: '#3D3D3D',
          gray50: '#7A7A7A',
          gray20: '#C8C8C8',
          gray10: '#F2F2F2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
