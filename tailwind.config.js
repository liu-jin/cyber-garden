/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui"],
        display: ["var(--font-outfit)", "system-ui"],
      },
      colors: {
        royal: {
          purple: "#6B46C1",
          gold: "#D4AF37",
          pearl: "#F8FAFC",
        },
        cyber: {
          mint: "#00F5D4",
          pink: "#FF0054",
          blue: "#00E5FF",
          yellow: "#FEE440",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "32px",
        "5xl": "40px",
      },
    },
  },
  plugins: [],
};
