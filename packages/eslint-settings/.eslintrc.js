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
  plugins: ['import', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        extensions: allExtensions,
      },
    },
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
    'object-curly-newline': 0,
    'object-curly-spacing': ['error', 'always'],
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
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    'no-unused-expressions': 0,
    'import/no-unresolved': 1,
    'import/prefer-default-export': 0,
    'import/no-webpack-loader-syntax': 1,
    'jsx-a11y/label-has-for': 0, // allow implicit label for input implementation
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/media-has-caption': 0,
    'linebreak-style': [1, process.platform === 'win32' ? 'windows' : 'unix'],
    'lines-between-class-members': 0, // function overloading in ts can be interrupted by this
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-empty-function': 0,
    'no-param-reassign': 0, // [].reduce are easier with this turned off,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'no-mixed-operators': 0,
    'no-void': 0,
    'no-restricted-syntax': [
      2,
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'react/destructuring-assignment': 1,
    'react/sort-comp': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: allExtensions,
      },
    ],
    'react/no-array-index-key': 0,
    'react/require-default-props': 1,
    'react/no-did-mount-set-state': 0, // dom size detection after mount may require setState in didMount
    'react/jsx-no-target-blank': 0,
    'react/no-this-in-sfc': 0,
    'consistent-return': 0,
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],
    'react/jsx-one-expression-per-line': 0,
    'no-plusplus': 0,
    camelcase: 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],
    'react/jsx-curly-newline': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-classes-per-file': 'off',
    // for crius use, the jsx must have react use ts cover that.
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function' },
    ],
  },
  overrides: [
    {
      files: [
        '*.test.js',
        '*.spec.js',
        '**/test/**/*.js',
        '**/test/**/*.ts',
        '**/__test__/**/*.js',
        '**/__test__/**/*.ts',
      ],
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
        browser: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        jsx: true,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
      },
      plugins: ['@typescript-eslint', 'import'],
      settings: {
        'import/extensions': allExtensions,
        'import/parsers': {
          '@typescript-eslint/parser': tsExtensions,
        },
        'import/resolver': {
          node: {
            extensions: allExtensions,
          },
        },
      },
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        'no-undef': 0,
        'react/prop-types': 0,
        'import/no-unresolved': [2, { commonjs: true, amd: true }],
        'import/named': 0,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 1,
        'arrow-parens': [2, 'always'],
        'no-useless-constructor': 'off',
        'no-unused-vars': 0,
        '@typescript-eslint/no-useless-constructor': 2,
        'object-shorthand': [2, 'always'],
        '@typescript-eslint/no-unused-vars': 1,
        'no-dupe-class-members': 0, // ts already checks this, disable this to allow overloading
      },
    },
  ],
};
