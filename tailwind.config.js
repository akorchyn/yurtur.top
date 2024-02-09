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
      },
      transitionTimingFunction: {
        'fade-in': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        'fade-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-safe-area')
  ],
}
