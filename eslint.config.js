import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  js.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
  }),
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin, // Cập nhật thành đối tượng thay vì chuỗi
      'react-hooks': reactHooksPlugin, // Cập nhật thành đối tượng thay vì chuỗi
    },
    rules: {
      'react/jsx-no-target-blank': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: ['warn', 'never'],
      quotes: ['warn', 'single'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]