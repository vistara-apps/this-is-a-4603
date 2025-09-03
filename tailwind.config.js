/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 20% 98%)',
        text: 'hsl(220 15% 30%)',
        accent: 'hsl(30 90% 60%)',
        primary: 'hsl(220 70% 55%)',
        surface: 'hsl(0 0% 100%)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        focus: '0 0 0 3px hsl(220 70% 55% / 0.5)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'hsl(220 15% 30%)',
            a: {
              color: 'hsl(220 70% 55%)',
              '&:hover': {
                color: 'hsl(220 70% 45%)',
              },
            },
            h1: {
              color: 'hsl(220 15% 20%)',
            },
            h2: {
              color: 'hsl(220 15% 20%)',
            },
            h3: {
              color: 'hsl(220 15% 20%)',
            },
            h4: {
              color: 'hsl(220 15% 20%)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

