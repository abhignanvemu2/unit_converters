/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },  
      colors: {
        primaryColor: '#285FE7',
        hoverPrimaryColor: '#1E4CBA',
        darkModeColor:'#141414',
        darkModeText:'#F5F7FA'
      },
    },
  },
  plugins: [],
};
