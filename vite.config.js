import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import icon from "../DogVille_Front_End/src/assets/dogvilleLogo-removebg.png"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'DogVille',
        short_name: 'DV',
        description: 'Servizio canile',
        theme_color: '#111C20',
        icons: [
          {
            src: {icon},
            sizes: '500x500',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
});