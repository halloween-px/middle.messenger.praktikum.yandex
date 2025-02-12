import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'

import { webcrypto } from 'node:crypto'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: '@use "./src/styles/main.scss" as *;',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
