import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), VitePWA({
    registerType: 'autoUpdate', manifest: {
      name: 'BPM Tracker',
      short_name: 'BPM',
      description: 'Manually tracks BPM of a song',
      theme_color: '#ffffff',
      "id": "https://apps.thasky.one/bpm",
      "start_url": "https://apps.thasky.one/bpm",
      "display": "standalone",
      "icons": [
        {
          "src": "bpm_logo.svg",
          "type": "image/svg+xml",
          "sizes": "any"
        },
        {
          "src": "bpm_logo_192.webp",
          "type": "image/webp",
          "sizes": "192x192"
        },
        {
          "src": "bpm_logo_512.webp",
          "type": "image/webp",
          "sizes": "512x512"
        }
      ],
      "screenshots": [
        {
          "src": "desktop.webp",
          "sizes": "1280x720",
          "type": "image/webp",
          "form_factor": "wide"
        },
        {
          "src": "mobile.webp",
          "sizes": "750x1334",
          "type": "image/webp",
          "form_factor": "narrow"
        }
      ]
    }
  })],
  base: "./",
})
