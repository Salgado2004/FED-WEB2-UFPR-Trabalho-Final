/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}",
            "./components/**/*.{js,ts,jsx,tsx}",
            
          ],
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
          0: "#eef2ff",
          1: "#ede9fe",
          2: "#ddd6fe",
          3: "#c4b5fd",
          4: "#a78bfa",
          5: "#8b5cf6",
          6: "#7c3aed",
          7: "#6d28d9",
          8: "#5b21b6",
          9: "#4c1d95",
          10: "#2e1065",
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

  plugins: [require("flowbite/plugin")],
};
