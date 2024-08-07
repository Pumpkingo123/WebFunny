import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px', 
      },
      spacing:{
        '1': '2px',
      },
      scrollbar: ['rounded'],
      colors: {
        rice: '#fdf7ef',
        black: '#000000',
        yellow: '#fdad45',
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
  plugins: [formsPlugin],
})