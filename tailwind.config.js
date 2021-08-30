
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './static/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        spacing: {
          '128': '32rem'
        }
      },
    },
    variants: {
      extend: {
      },
    },
    plugins: [
    ],
  }
