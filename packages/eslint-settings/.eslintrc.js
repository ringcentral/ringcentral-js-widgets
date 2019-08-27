const localeSettings = require('@ringcentral-integration/locale-settings');
const jsRegex = ['**/*.js', '**/*.jsx'];
const tsRegex = ['**/*.ts', '**/*.tsx'];
const jsExtensions = ['.js', '.jsx'];
const tsExtensions = ['.ts', '.tsx'];
const allExtensions = jsExtensions.concat(tsExtensions);

module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    // webextensions: true,
    // jest: true,
    // jasmine: true
  },
  globals: {
    $: true,
  },
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': allExtensions
      }
    }
  },
  rules: {
    'max-len': [
      2,
      {
        code: 100,
        comments: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'operator-linebreak': [1, 'after'],
    'object-shorthand': [
      2,
      'always',
      {
        avoidExplicitReturnArrows: true,
      },
    ],
    'function-paren-newline': 0,
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'prefer-destructuring': [
      2,
      {
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 1,
    'import/no-unresolved': 1,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': 0, // allow implicit label for input implementation
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'linebreak-style': 'off',
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-empty-function': 1,
    'no-param-reassign': 0, // [].reduce are easier with this turned off,
    'no-restricted-syntax': [
      2,
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'object-curly-newline': 0,
    'object-curly-spacing': ['error', 'always'],
    'react/destructuring-assignment': 1,
    'react/sort-comp': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: allExtensions,
      },
    ],
    'react/no-array-index-key': 0,
    'react/require-default-props': 1,
    'no-mixed-operators': 0,
    'react/no-did-mount-set-state': 0, // dom size detection after mount may require setState in didMount
    'consistent-return': 0,
    'react/jsx-no-target-blank': 0,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }]
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true,
        jasmine: true,
      },
      rules: {
        'no-eval': 0,
      },
    },
    {
      files: localeSettings.supportedLocales.map((locale) => `**/${locale}.js`),
      rules: {
        quotes: 0,
      },
    },
    {
      files: tsRegex,
      env: {
        browser: true
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        jsx: true,
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
      },
      plugins: ['@typescript-eslint', 'import'],
      settings: {
        'import/extensions': allExtensions,
        'import/parsers': {
          '@typescript-eslint/parser': tsExtensions
         },
         'import/resolver': {
             'node': {
                 'extensions': allExtensions
             }
         }
      },
      rules: {
        'react/prop-types': 0,
        'import/no-unresolved': [2, {commonjs: true, amd: true}],
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'arrow-parens': ['error', 'always'],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'object-shorthand': ['error', 'always']
      }
    }
  ],
};
