/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'accent': '#8b5cf6',
        'bg-dark': '#09090b',
        'bg-card': '#18181b',
        'border-dim': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blink-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
