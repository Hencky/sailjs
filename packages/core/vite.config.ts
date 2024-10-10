/// <reference types="vitest/config" />
// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  plugins:[
    dts({
      entryRoot: "./src",
      outDir: ["/es/src", "/lib/src"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: "../../tsconfig.json",
    })
  ]
});
