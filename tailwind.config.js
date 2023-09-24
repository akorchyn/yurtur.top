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
        'secondary': '#eacbd2',
        'three': '#dfaeb4',
      }
    },
  },
  plugins: [],
}