/// <reference types="vitest/config" />
// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  plugins: [
    dts({
      entryRoot: './src',
      outDir: './es',
      tsconfigPath: './tsconfig.json',
      exclude: ['**/demos/**', '**/tests/**'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'mobx'],
      output: {
        dir: 'es',
        entryFileNames: 'index.js',
      },
    },
  },
});
