/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': ' #111C20',
        'whiteino': '#E0E2E2',
        'reddino': '#AF9A9B',
        'grigino': '#262626'
      }
    },
  },
  plugins: [
    lineClamp
  ],
}

