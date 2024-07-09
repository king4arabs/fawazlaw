/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bggradient: "var(--gradirnt)",
        bggradient2: "var(--gradirnt2)",
        'custom-gradient': 'linear-gradient(to bottom, #EEF3FE, #fff)'
      },
      boxShadow: {
        'top': '0 -5px 0px rgba(255, 0, 0)',
        'top-blue': '0 -5px 0px rgba(0, 0, 255)', 
        'top-darkRed': '0 -5px 0px #B60C0C'// Adjust values as needed
      },
    },
  },
  // plugins: [],
  plugins: [require("daisyui")],
};
