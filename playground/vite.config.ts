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
      '@demos/form': path.resolve(__dirname, '../packages/form/demos'),
      '@demos/plugins': path.resolve(__dirname, '../packages/plugins/demos'),
      '@demos/table': path.resolve(__dirname, '../packages/table/demos'),
      // TODO: main
      '@voyagejs/form': path.resolve(__dirname, '../packages/form/src/index.ts'),
      '@voyagejs/register': path.resolve(__dirname, '../packages/register/src/index.ts'),
      '@voyagejs/plugins': path.resolve(__dirname, '../packages/plugins/src/index.ts'),
      '@voyagejs/shared': path.resolve(__dirname, '../packages/shared/src/index.ts'),
      '@voyagejs/table': path.resolve(__dirname, '../packages/table/src/index.ts'),
    },
  },
});
