/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 70% 55%)',
        accent: 'hsl(30 90% 60%)',
        background: 'hsl(220 20% 98%)',
        surface: 'hsl(0 0% 100%)',
        text: 'hsl(220 15% 30%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        'focus': '0 0 0 3px hsl(220 70% 55% / 0.5)',
      },
    },
  },
  plugins: [],
}