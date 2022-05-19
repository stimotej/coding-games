module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#151422",
        secondary: "#272636",
        "secondary-light": "#3E3D4F",
        orange: "#ff7849",
        "text-light": "#9E9E9E",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
