import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase limit to 2000kb to suppress the warning
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // High-Fidelity Manual Chunking for Industrial Libraries
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'utils-vendor': ['axios'],
        },
      },
    },
    // Future-proofing for Vite 8 / Rolldown as suggested in build logs
    rolldownOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react', 'axios'],
        },
      },
    },
  },
})
