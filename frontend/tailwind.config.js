/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e0e7fe",
          500: "#3e38a7",
          600: "#5046e4",
        },
        grey:{
          100:"#d7d7d7",
          150:"#bcbcbc",
          50:"#fffefe",
          300:"#f7f9fb",
          500:"#757475"
        },
        

      }
    },
  },
  plugins: [],
}
