/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primarygreen': '#50C878',
      }
      ,
      screens: {
        'xs': '475px',
      },
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'Verdana', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
      'openSans': ['Open Sans', 'sans-serif'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]

}
