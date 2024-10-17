import { mergeConfig } from 'vite';
import { resolve } from 'path';
import commonConfig from '../../vite.config';

export default mergeConfig(commonConfig, {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        dir: 'es',
        entryFileNames: 'index.js',
      },
    },
  },
});
