import { defineConfig } from 'vite';

// plugins
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({ 
      disable: process.env.VITE_PWA_BUILD !== '1',
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
        'screenshots': [
          {
            'src': '/assets/screenshots/mobile-screenshot-0.jpg',
            'sizes': '1284x2778',
            'type': 'image/jpg',
            'platform': 'narrow',
            'label': 'Homescreen'
          },
          {
            'src': '/assets/screenshots/mobile-screenshot-1.jpg',
            'sizes': '1284x2778',
            'type': 'image/jpg',
            'platform': 'narrow',
            'label': 'States page'
          },
          {
            'src': '/assets/screenshots/mobile-screenshot-2.jpg',
            'sizes': '1284x2778',
            'type': 'image/jpg',
            'platform': 'narrow',
            'label': 'Developer guide'
          },
        ],
        'shortcuts': [
          {
            'name': 'Near me',
            'url': '/nearme',
            'short_name': 'Near',
            'description': 'Nearest events to you',
            'icons': [{
              'src': '/assets/pwa-icons/nearme-icon.png',
              'size': '512x512'
            }]
          },
          {
            'name': 'Provinces',
            'url': '/states',
            'short_name': 'Provinces',
            'description': 'Events per state',
            'icons': [{
              'src': '/assets/pwa-icons/states-icon.png',
              'size': '512x512'
            }]
          },
          {
            'name': 'About',
            'url': '/about',
            'short_name': 'About',
            'description': 'About Earthquake monitoring',
            'icons': [{
              'src': '/assets/pwa-icons/about-icon.png',
              'size': '512x512'
            }]
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
