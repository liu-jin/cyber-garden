/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          green: "#E6FFFA",
        },
        dragon: {
          blue: "#4FD1C5",
        },
        apple: {
          red: "#F56565",
        },
        banana: {
          yellow: "#F6AD55",
        },
        sky: {
          blue: "#63B3ED",
        },
      },
      borderRadius: {
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
