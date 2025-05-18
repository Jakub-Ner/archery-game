// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'pixel-vt': ['VT323', 'monospace'],
        'pixel-silk': ['Silkscreen', 'cursive'],
        },
        backgroundImage: {
          'background': "url('/background.png')",  // Ścieżka do obrazu w public
        },
      },
    },
    plugins: [],
  }
  