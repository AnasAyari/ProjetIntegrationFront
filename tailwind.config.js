/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#3a3a3a',
        'bgDark' : '#222222',
        'bgHigh' : '#bcbbc7',
        'yellow': '#ffd306'
    },
    fontFamily:{
      'arial':['Rubik Mono One', 'monospace'],
    },
    fontSize: {
      // '7xl': '5rem', 
      // '8xl': '6rem', 
    },
    scale: {
      '101': '1.01',
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
}
