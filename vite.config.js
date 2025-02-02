import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
