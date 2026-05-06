import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'showcase',
  build: {
    outDir: '../dist-showcase',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'showcase/index.html'),
        verify: resolve(__dirname, 'showcase/verify.html'),
      },
    },
  },
  resolve: {
    alias: {
      'igt-design-system-v2': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    open: true,
  },
})
