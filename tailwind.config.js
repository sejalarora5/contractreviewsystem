/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customFocusBorder: '#000000', // Define custom color here
      },
    },
  },
  plugins: [
    // require('daisyui'),
    daisyui
  ],
  
}

