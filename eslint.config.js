import Module from 'node:module'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const origResolveFilename = Module._resolveFilename
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === 'typescript') {
    return origResolveFilename.call(this, '@typescript/typescript6', parent, isMain, options)
  }
  return origResolveFilename.call(this, request, parent, isMain, options)
}

const { default: tseslint } = await import('typescript-eslint')

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
