/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",               // ✅ Checks root files (index.tsx, App.tsx)
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Checks components folder
    "./pages/**/*.{js,ts,jsx,tsx}"       // ✅ Checks pages folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
