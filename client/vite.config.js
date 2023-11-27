import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3001,
    proxy : {
      '/api' : {
        // target : 'http://localhost:5005',
        target : 'http://expense-tracker-mern-theta.vercel.app',
        changeOrigin : true
      }
    }
  }
})
