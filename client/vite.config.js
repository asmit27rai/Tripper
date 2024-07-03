import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  define:{
    'process.env.WHETHER_API':JSON.stringify(process.env.WHETHER_API)
  }
})
