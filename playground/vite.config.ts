import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@demos/core': path.resolve(__dirname, '../packages/core/demos'),
      '@demos/plugins': path.resolve(__dirname, '../packages/plugins/demos'),
    },
  },
});
