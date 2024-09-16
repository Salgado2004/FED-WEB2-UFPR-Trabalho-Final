/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        red: colors.red,
        yellow: colors.yellow,
        green: colors.green,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.purple,
        pink: colors.pink,
        success: "#22c55e",
        alert: "#fbbf24",
        error: "#b91c1c",
        "default-white": "#f1f5f9",
        "default-black": "#1a202c",
        primary: {
          0: "#f0fdfa",
          1: "#ccfbf1",
          2: "#99f6e4",
          3: "#5eead4",
          4: "#2dd4bf",
          5: "#14b8a6",
          6: "#0d9488",
          7: "#0f766e",
          8: "#115e59",
          9: "#134e4a",
          10: "#083344",
        },
        secondary: {
          0: "#fdf4ff",
          1: "#fae8ff",
          2: "#f5d0fe",
          3: "#f0abfc",
          4: "#e879f9",
          5: "#d946ef",
          6: "#c026d3",
          7: "#a21caf",
          8: "#86198f",
          9: "#701a75",
          10: "#4a044e",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Roboto", "serif"],
      },
      spacing: {
        100: "30rem",
      },
    },
  },
  plugins: [],
};
