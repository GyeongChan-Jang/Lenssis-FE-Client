import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const __dirname = 'src'
export default defineConfig({
  define: {
    global: {}
  },
  plugins: [react()],
  resolve: {
    // 절대 경로 설정
    alias: [{ find: '~', replacement: resolve(__dirname) }]
  }
})
