import { defineConfig } from 'eslint-define-config'
import parser from '@typescript-eslint/parser'
import plugin from '@typescript-eslint/eslint-plugin'
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
    plugins: {
      '@typescript-eslint': plugin,
    },
    ignores: ['dist/**', '**/*.min.js', 'node_modules/**'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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
