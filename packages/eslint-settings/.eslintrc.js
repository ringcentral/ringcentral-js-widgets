/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['@typescript-eslint', 'lodash', 'jsx-a11y'],
  ignorePatterns: ['node_modules', 'dist', 'build', 'html-report', '*.json'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  overrides: [
    // js ts files
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        react: {
          version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
      },
      rules: {
        'lodash/import-scope': 'error',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'import/no-cycle': 'error',
        'import/no-duplicates': 'error',
        'import/named': 'off',
        'no-undef': 'error',
        // just use ts to verify that
        'import/default': 'off',
        'no-console': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: '(useEffectOnDocumentFocus)',
          },
        ],
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    // js files
    {
      files: ['*.js', '*.jsx'],
      extends: [],
      rules: {},
    },
    // ts files
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // * close that for current eslint still not support metadata https://github.com/typescript-eslint/typescript-eslint/issues/5468
        // '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              '{}': false,
            },
            extendDefaults: true,
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-alert': 'error',
      },
    },
    // react files
    {
      files: ['*.jsx', '*.tsx'],
      extends: [],
      rules: {
        // a11y still not need in our app
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
    // scripts related files
    {
      files: ['**/scripts/**/*', '**/tools/**/*', 'gulpfile.js'],
      rules: {
        'no-console': 'off',
        // off all import related rules in here for performance issue
        'import/namespace': 'off',
        'import/no-named-as-default': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-cycle': 'off',
      },
    },
    // test files
    {
      files: [
        'packages/script-weaver-e2e-test/**/*',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
      ],
      plugins: ['jest', 'crius'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'crius/common-export': 'error',
        'no-console': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react/jsx-key': 'off',
        'jest/no-conditional-expect': 'off',
        'no-undef': 'off',
        'jest/no-export': 'off',
        'jest/no-standalone-expect': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    // for next generation projects, we should install all dep in root folder, so there is no longer need that settings
    {
      files: ['apps/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        // * close that for current eslint still not support metadata https://github.com/typescript-eslint/typescript-eslint/issues/5468
        // '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    // for i18n folder, ignore prettier format
    {
      files: ['**/i18n/**/*'],
      rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
      },
    },
    {
      files: ['*.view.tsx', '*.plugin.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
};
