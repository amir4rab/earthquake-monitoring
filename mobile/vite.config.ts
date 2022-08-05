import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        'name': 'Earthquake Monitoring',
        'short_name': 'EM',
        'description': 'Latest earthquake events in iran.',
        'icons': [
          {
            'src': '/assets/pwa-icons/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'any maskable'
          },
          {
            'src': '/assets/pwa-icons/android-chrome-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': '/assets/pwa-icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          },
          {
            'src': '/assets/pwa-icons/icon-1024x1024.png',
            'sizes': '1024x1024',
            'type': 'image/png'
          },
          {
            'src': '/assets/pwa-icons/512-maskable.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'maskable'
          }
        ],
        'theme_color': '#4C6EF5',
        'background_color': '#141517',
        'start_url': '/pwa-home',
        'display': 'standalone',
        'lang': 'en',
        'dir': 'ltr',
        'categories': [ 'utilities' ]
      }
    })
  ]
})
