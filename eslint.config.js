import { defineConfig } from 'eslint-define-config'
import parser from '@typescript-eslint/parser'
import globals from 'globals'

export default defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    ignores: ['dist/**', '**/*.min.js', 'node_modules/**'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    files: ['vite.config.js', 'eslint.config.js', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    ignores: ['dist/**', '**/*.min.js', 'node_modules/**'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used' }],
      eqeqeq: ['error', 'always'],
    },
  },
])
