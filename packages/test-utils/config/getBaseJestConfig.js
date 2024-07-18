const __CI__ = process.argv.includes('--ci');
const {
  ignores,
} = require('@ringcentral-integration/babel-settings/lib/ignores');
const globals = { __CI__ };

function getReporters(reporterPrefix = '', outputRoot = '<rootDir>/') {
  const reporters = [];

  reporters.push('default', [
    'jest-html-reporters',
    {
      publicPath: `${outputRoot}html-report`,
      filename: `${reporterPrefix}jest-report.html`,
      failureMessageOnly: false,
    },
  ]);

  // 'jest-junit' for CI status statistics only
  if (__CI__) {
    reporters.push([
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: `${outputRoot}junit-report`,
        outputName: `./${reporterPrefix}junit.xml`,
        classNameTemplate: (vars) =>
          vars.filename.indexOf('RCI-') > -1
            ? vars.filename.match(/(RCI-[0-9]+)/g)[0]
            : vars.filename,
        titleTemplate: '{filename}-{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true',
      },
    ]);
  }

  return reporters.length > 0 ? reporters : undefined;
}

/**
 * base jest config provide for new and legacy jest
 */
const getBaseJestConfig = ({
  reporterPrefix = '',
  useNextConfig = false,
} = {}) => {
  return {
    testEnvironment: 'jsdom',
    // some package be esm module, need transform
    transformIgnorePatterns: [...ignores],
    transform: {
      'loadLocale\\.(js|jsx|ts|tsx)$':
        '@ringcentral-integration/test-utils/mock/loadLocale.js',
      '^.+\\.(js|jsx|ts|tsx)$': useNextConfig
        ? '@ringcentral-integration/babel-settings/lib/nextTransform.js'
        : '@ringcentral-integration/babel-settings/lib/jestTransform.js',
    },
    moduleNameMapper: {
      '\\.svg$': '@ringcentral-integration/test-utils/mock/svgMock.js',
      // ?url is load as string url, use file mock
      '\\.*\\?url$': '@ringcentral-integration/test-utils/mock/fileMock.js',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
        '@ringcentral-integration/test-utils/mock/fileMock.js',
      '\\.(css|less|scss)$':
        '@ringcentral-integration/test-utils/mock/styleMock.js',
      // https://github.com/axios/axios/issues/5101
      // Remove this when jest>=29
      '^axios$': require.resolve('axios'),
      'serialize-error': require.resolve('serialize-error'),
    },
    setupFiles: ['@ringcentral-integration/test-utils/scripts/jest.setup.js'],
    setupFilesAfterEnv: [
      '@ringcentral-integration/test-utils/scripts/jest.setupAfterEnv.js',
    ],
    // * Copy from nx https://github.com/nrwl/nx/blob/master/packages/jest/preset/jest-preset.ts
    /**
     * manually set the exports names to load in common js, to mimic the behaviors of jest 27
     * before jest didn't fully support package exports and would load in common js code (typically via main field). now jest 28+ will load in the browser esm code, but jest esm support is not fully supported.
     * In this case we will tell jest to load in the common js code regardless of environment.
     *
     * this can be removed via just overriding this setting in it's usage
     *
     * @example
     * module.exports = {
     *   ...nxPreset,
     *   testEnvironmentOptions: {},
     * }
     */
    testEnvironmentOptions: {
      customExportConditions: ['node', 'require', 'default'],
    },
    globals,
    reporters: getReporters(reporterPrefix),
    globalSetup: '@ringcentral-integration/test-utils/scripts/global-setup.js',
  };
};

exports.getReporters = getReporters;
exports.getBaseJestConfig = getBaseJestConfig;
exports.globals = globals;
