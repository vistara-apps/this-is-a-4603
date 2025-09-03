/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        text: 'var(--color-text)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
      },
    },
  },
  plugins: [
    // Using import.meta.require for ESM compatibility
    await import('@tailwindcss/aspect-ratio').then(m => m.default),
    await import('@tailwindcss/forms').then(m => m.default),
    await import('@tailwindcss/typography').then(m => m.default),
  ],
};
