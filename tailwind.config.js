module.exports = {
  mode: "all",
  content: [
    // include all rust, html and css files in the src directory
    "./src/**/*.{rs,html,css}",
    // include all html files in the output (dist) directory
    "./dist/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#f08cae',
        'secondary': '#ffe5b4',
        'third': '#a5b4fc',
      },
      minWidth: {
        '96': '24rem',
        '32': '8rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-safe-area')
  ],
}