/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",                // ✅ Checks root files (App.tsx)
    "./components/**/*.{js,ts,jsx,tsx}",  // ✅ Checks components folder
    "./pages/**/*.{js,ts,jsx,tsx}"        // ✅ Checks pages folder
  ],
  darkMode: 'class', // 🌑 This enables the toggle
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
