import js       from '@eslint/js';
import astro    from 'eslint-plugin-astro';
import react    from 'eslint-plugin-react';
import globals  from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/', 'build/']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.tsx'],
    ...react.configs.flat.recommended
  },
  {
    files: ['**/*.tsx'],
    ...react.configs.flat['jsx-runtime']
  },
  {
    files: ['**/*.{astro,js,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'array-bracket-spacing': [2, 'never'],
      'indent': [2, 2, { 'SwitchCase': 1, 'MemberExpression': 0 }],
      'jsx-quotes': [2, 'prefer-double'],
      'keyword-spacing': 2,
      'no-console': 2,
      'no-extra-semi': 2,
      'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 0 }],
      'no-multi-spaces': [2, {
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true
        }
      }],
      'no-trailing-spaces': 2,
      'object-curly-spacing': [2, 'always'],
      'padded-blocks': [2, { 'classes': 'never' }],
      'quotes': [2, 'single'],
      'semi': 2,
      'space-before-function-paren': 2,
      'space-in-parens': 2
    }
  },
  {
    files: ['**/*.tsx'],
    plugins: { react },
    rules: {
      'react/boolean-prop-naming': 2,
      'react/jsx-boolean-value': 2,
      'react/jsx-sort-props': 2,
      'react/jsx-tag-spacing': [2, {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never'
      }],
      'react/jsx-props-no-multi-spaces': 2
    }
  }
];
