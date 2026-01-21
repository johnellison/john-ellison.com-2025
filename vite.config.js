import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory for dev server
  root: '.',

  // Public assets directory
  publicDir: 'public',

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',

    // Generate source maps for debugging
    sourcemap: true,

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },

    // Multi-page app configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        transformation: resolve(__dirname, 'ai-transformation.html'),
        toucan: resolve(__dirname, 'case-studies/toucan.html'),
        interbeing: resolve(__dirname, 'case-studies/interbeing-case-study.html'),
      },
      output: {
        // Asset naming
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
  },

  // Dev server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Optimization
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger'],
  },

  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});
