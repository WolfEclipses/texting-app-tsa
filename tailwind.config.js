/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        accent: 'var(--accent-color)', // Adding accent color from CSS variable
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Custom plugin for accent utility classes
    function({ addUtilities }) {
      const newUtilities = {
        '.text-accent': {
          color: 'var(--accent-color)',
        },
        '.bg-accent': {
          backgroundColor: 'var(--accent-color)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
