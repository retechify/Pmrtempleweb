import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically use subfolder for GitHub Pages, but use root for Vercel
  base: process.env.NODE_ENV === 'production' && !process.env.VERCEL ? "/Pmrtempleweb/" : "/"
})
