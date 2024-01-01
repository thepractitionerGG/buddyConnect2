/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

      // here this color will be set for the whole app so this file has global effect for css of the project
      colors:{
        primary:"#4D426D" 
      }
    },
  },
  plugins: [],
}