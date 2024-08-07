import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components/ui'),
      },
    ],
  },
  define: {
    VITE_OPENAPI_KEY: process.env.VITE_OPENAPI_KEY,
  },
})
