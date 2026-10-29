import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative asset paths so the build works under the GitHub Pages /<repo>/ subpath.
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
})
