import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'
import crypto from 'crypto'

if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto
}

export default defineConfig({
  server: {
    port: 3000,
    open: true,
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
