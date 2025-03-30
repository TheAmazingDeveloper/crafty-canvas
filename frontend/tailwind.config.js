/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#030303",
        cream: "#e8e0de",
        brown: "#a47d7e",
      },
    },
  },
  plugins: [],
};
