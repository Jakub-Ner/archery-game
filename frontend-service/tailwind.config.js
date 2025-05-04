// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'background': "url('/background.png')",  // Ścieżka do obrazu w public
        },
      },
    },
    plugins: [],
  }
  