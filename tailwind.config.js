/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import daisyui from 'daisyui';
import flyonui from 'flyonui';
import flynouiPlugin from 'flyonui/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js", // Percorso richiesto da FlyonUI
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#111C20',
        'whiteino': '#E0E2E2',
        'reddino': '#AF9A9B',
        'grigino': '#262626',
        "grigiastro": "#94A3B8"
      }
    },
  },
  plugins: [
    lineClamp,
    daisyui,
    flyonui, // Plugin base di FlyonUI
    flynouiPlugin // Plugin JS di FlyonUI
  ],
}
