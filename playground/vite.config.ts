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
      // TODO: main
      '@sailjs/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
      '@sailjs/register': path.resolve(__dirname, '../packages/register/src/index.ts'),
      '@sailjs/plugins': path.resolve(__dirname, '../packages/plugins/src/index.ts'),
      '@sailjs/shared': path.resolve(__dirname, '../packages/shared/src/index.ts'),
    },
  },
});
