const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class", // <-- Important
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2563EB",
          dark: "#3B82F6",
        },
      },
    },
  },

  plugins: [],
});
