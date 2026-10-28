import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mirrors the /api/startng rewrite in vercel.json so live data works locally too.
const startNgApi = {
  '/api/startng': {
    target: 'https://api.start.ng',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api\/startng/, ''),
  },
}

export default defineConfig({
  plugins: [react()],
  server: { proxy: startNgApi },
  preview: { proxy: startNgApi },
})
