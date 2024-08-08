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
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils'),
      },
      {
        find: '@stores',
        replacement: resolve(__dirname, './src/stores'),
      },
      {
        find: '@types',
        replacement: resolve(__dirname, './src/types.ts'),
      },
      {
        find: '@routes',
        replacement: resolve(__dirname, './src/routes'),
      },
    ],
  },
  define: {
    VITE_OPENAPI_KEY: JSON.stringify(process.env.VITE_OPENAPI_KEY),
  },
})
