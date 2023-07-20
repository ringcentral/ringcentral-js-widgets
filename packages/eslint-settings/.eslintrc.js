/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['@nrwl/nx', 'lodash'],
  ignorePatterns: ['node_modules', 'dist', 'build', 'html-report', '*.json'],
  overrides: [
    // js ts files
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      extends: [
        'plugin:@nrwl/nx/javascript',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
      rules: {
        'lodash/import-scope': 'error',
        'react/no-array-index-key': 'warn',
        'import/no-cycle': 'error',
        'import/order': 'error',
        'import/no-duplicates': 'error',
        'import/named': 'off',
        'no-console': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        // for more detail view here https://nx.dev/structure/monorepo-tags
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: false,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    // js files
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nrwl/nx/javascript'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    // ts files
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nrwl/nx/typescript', 'plugin:import/typescript'],
      rules: {
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
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
      extends: ['plugin:@nrwl/nx/react'],
      rules: {
        // a11y still not need in our app
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
    {
      files: ['**/__stories__/**/*'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        'no-console': 'off',
        '@nrwl/nx/enforce-module-boundaries': 'off',
        'jest/no-disabled-tests': 'off',
        'jest/valid-expect': 'error',
        'jest/valid-expect-in-promise': 'error',
        'jest/no-identical-title': 'warn',
        'jsx-a11y/accessible-emoji': 'warn',
        'react/button-has-type': 'off',
        'jsx-a11y/label-has-associated-control': 'warn',
        'no-alert': 'warn',
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
        '@nrwl/nx/enforce-module-boundaries': 'off',
      },
    },
    // test files
    {
      files: [
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
      ],
      plugins: ['jest'],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'no-undef': 'off',
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
      files: ['__next__/**'],
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
