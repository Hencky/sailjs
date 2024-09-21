/// <reference types="vitest/config" />
// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
