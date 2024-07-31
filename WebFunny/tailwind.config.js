/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px', 
      },
      fontSize: {
        base: '37.5px',
      },
      spacing:{
        '1': '2px',
      },
      scrollbar: ['rounded'],
      colors: {
        black: '#000000',
      },
      borderRadius: {
        'cs': '1px', 
        'xs': '2px',
      }
    },
    fontSize: {
      xs: '1px',
      sm: '4px',
      ssm:'4.5px',
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