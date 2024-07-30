/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '16',
      },
      scrollbar: ['rounded'],
      colors: {
        black: '#000000',
      }
    },
    fontSize: {
      xs: '13px',
      sm: '16px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      'rxs': '12px',
      'rrxs': '10px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
  },
  plugins: [],
}