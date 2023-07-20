const __CI__ = process.argv.includes('--ci');
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
    transform: {
      'loadLocale\\.(js|jsx|ts|tsx)$':
        '@ringcentral-integration/test-utils/mock/loadLocale.js',
      '^.+\\.(js|jsx|ts|tsx)$': useNextConfig
        ? '@ringcentral-integration/babel-settings/lib/nextTransform.js'
        : '@ringcentral-integration/babel-settings/lib/jestTransform.js',
    },
    moduleNameMapper: {
      '\\.svg$': '@ringcentral-integration/test-utils/mock/svgMock.js',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
        '@ringcentral-integration/test-utils/mock/fileMock.js',
      '\\.(css|less|scss)$':
        '@ringcentral-integration/test-utils/mock/styleMock.js',
      // https://github.com/axios/axios/issues/5101
      // Remove this when jest>=29
      '^axios$': require.resolve('axios'),
    },
    setupFiles: ['@ringcentral-integration/test-utils/scripts/jest.setup.js'],
    setupFilesAfterEnv: [
      '@ringcentral-integration/test-utils/scripts/jest.setupAfterEnv.js',
    ],
    globals,
    reporters: getReporters(reporterPrefix),
  };
};

exports.getReporters = getReporters;
exports.getBaseJestConfig = getBaseJestConfig;
exports.globals = globals;
