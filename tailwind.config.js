/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#243642',
        secondary: '#E2F1E7',
        // Puedes agregar más colores aquí
      },
    },
  },
  plugins: [],
}