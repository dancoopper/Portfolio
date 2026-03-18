/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00FF41',
        'cyber-blue': '#00E4FF',
        'terminal-black': '#0A0A0A',
        'terminal-gray': '#1A1A1A',
        'scanline': 'rgba(0, 255, 65, 0.05)',
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blink-cursor': 'blink 1s step-end infinite',
        'scanline-scroll': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}
