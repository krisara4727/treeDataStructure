/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        textColor: "rgba(225,225,225,0.87)",
        divBg: "#30363f",
      },
    },
  },
  plugins: [],
};
