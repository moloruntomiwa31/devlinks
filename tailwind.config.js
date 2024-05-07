/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    colors: {
      "purple-secondary": "#633cff",
      "purple-primary": "#beadff",
      "dark-gray-secondary": "#333333",
      "dark-gray-primary": "#737373",
      "light-gray-secondary": "#d9d9d9",
      "light-gray-primary": "#efebff",
      "red-secondary": "#ff3939",
      "white": "#ffffff",
      "black": "#000000",
      "white-primary": "#fafafa",
    },
    fontFamily: {
      sans: ["Instrument-Sans", "sans-serif"],
    },
  },
  plugins: [],
};
