import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), imagetools()],
  base: '/mobile_invitation.github.io/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cyworld: resolve(__dirname, 'cyworld/index.html'),
      },
    },
  },
})
