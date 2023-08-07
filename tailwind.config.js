/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000", // Replace with your desired primary color
        secondary: "#00FF00", // Replace with your desired secondary color
      },
    },
  },
  plugins: [],
};
