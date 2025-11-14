// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Purge CSS no usado en producción
      applyBaseStyles: false,
    }), 
    react()
  ],
  
  // Optimizaciones de rendimiento
  vite: {
    build: {
      // Minificación agresiva
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.log en producción
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      // Chunks más pequeños
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
      // Reducir tamaño de chunks
      chunkSizeWarningLimit: 1000,
    },
    // Optimizar CSS
    css: {
      devSourcemap: false,
    },
  },
  
  // Compresión de output
  compressHTML: true,
});
