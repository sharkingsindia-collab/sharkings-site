import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable better tree-shaking and minification
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Split vendor chunks to improve caching
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        }
      }
    },
    // Increase chunk size warning limit since Three.js is large
    chunkSizeWarningLimit: 1200,
    // Enable source maps only in development
    sourcemap: false
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'three']
  }
})
