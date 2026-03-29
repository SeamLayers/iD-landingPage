import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react({
      // Optimize React compilation for smaller bundles
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Build optimizations
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: 'lightningcss',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['motion'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 700,
    cssCodeSplit: true,
    // Enable source maps only in production for debugging
    sourcemap: false,
    // Report compressed size
    reportCompressedSize: false,
  },

  // Server optimizations
  server: {
    hmr: {
      overlay: true,
    },
    // Optimize dev server for fast refresh
    middlewareMode: false,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion', 'lucide-react'],
    // Exclude dynamic imports to allow lazy loading
    exclude: ['@figma/my-make-file'],
  },

  // CSS handling
  css: {
    // Use Lightning CSS for faster bundling
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  },
})
