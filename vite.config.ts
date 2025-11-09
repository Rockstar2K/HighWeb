import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Copy all assets from src/assets to dist/assets
    assetsInlineLimit: 0, // This ensures all assets are copied as files
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1].toLowerCase();
          
          // Handle different asset types
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          } else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          
          // Default for other assets
          return 'assets/misc/[name]-[hash][extname]';
        },
      },
    },
  },
  // Ensure assets are properly copied
  publicDir: 'public',
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
})
