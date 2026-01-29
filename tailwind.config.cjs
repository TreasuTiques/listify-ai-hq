/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",               // ✅ Checks Root files (App.tsx, index.tsx)
    "./src/**/*.{js,ts,jsx,tsx}",        // ✅ Checks src folder (just in case)
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Checks components folder in root
    "./pages/**/*.{js,ts,jsx,tsx}"       // ✅ Checks pages folder in root
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
