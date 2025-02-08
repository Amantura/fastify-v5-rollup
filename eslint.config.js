import globals from 'globals'
import pluginJs from '@eslint/js'

const rules = {
  'no-console': 'off',
  'no-debugger': 'off',
  'no-useless-catch': 'off',
  quotes: ['error', 'single'],
  semi: ['warn', 'never'],
  'comma-dangle': ['error', 'only-multiline'],
  'space-before-function-paren': [2, {
    anonymous: 'always', named: 'never'
  }],
  indent: ['error', 2],
  'no-multiple-empty-lines': ['warn', {
    max: 2, maxEOF: 1
  }],
  'no-unused-vars': ['warn'],
  'prefer-const': ['warn'],
  'require-await': ['warn'],
  'no-unreachable': ['warn'],
  'object-curly-newline': ['error', {
    ObjectExpression: 'always',
    ObjectPattern: {
      multiline: true
    },
    ImportDeclaration: 'always',
    ExportDeclaration: {
      multiline: true, minProperties: 3
    }
  }]
}


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    rules
  },
  {
    ignores: [
      'output/**/*',
      'node_modules/**/*'
    ]
  }
]