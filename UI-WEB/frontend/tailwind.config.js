/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bggradient: "var(--gradirnt)",
        bggradient2: "var(--gradirnt2)",
      },
    },
  },
  // plugins: [],
  plugins: [require("daisyui")],
};
