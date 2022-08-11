const __CI__ = process.argv.includes('--ci');
const useSwc = !!process.env.SWC;
useSwc && console.log(`Using @swc/jest`);
function getReporters(reporterPrefix) {
  const reporters = [];

  reporters.push('default', [
    'jest-html-reporters',
    {
      publicPath: '<rootDir>/html-report',
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
        outputDirectory: '<rootDir>/junit-report',
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
const getBaseJestConfig = ({ reporterPrefix = '' } = {}) => {
  return {
    testEnvironment: 'jsdom',
    transform: {
      'loadLocale\\.(js|jsx|ts|tsx)$':
        '@ringcentral-integration/test-utils/mock/loadLocale.js',
      ...(useSwc
        ? {
            '^.+\\.(t|j)sx?$': [
              '@swc/jest',
              {
                jsc: {
                  target: 'es2020',
                  parser: {
                    syntax: 'typescript',
                    decorators: true,
                    tsx: true,
                  },
                  transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                  },
                },
              },
            ],
          }
        : {
            '^.+\\.(js|jsx|ts|tsx)$':
              '@ringcentral-integration/babel-settings/lib/jestTransform.js',
          }),
    },
    moduleNameMapper: {
      '\\.svg$': '@ringcentral-integration/test-utils/mock/svgMock.js',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
        '@ringcentral-integration/test-utils/mock/fileMock.js',
      '\\.(css|less|scss)$':
        '@ringcentral-integration/test-utils/mock/styleMock.js',
    },
    setupFiles: ['@ringcentral-integration/test-utils/scripts/jest.setup.js'],
    setupFilesAfterEnv: [
      '@ringcentral-integration/test-utils/scripts/jest.setupAfterEnv.js',
    ],
    globals: { __CI__ },
    reporters: getReporters(reporterPrefix),
  };
};

exports.getReporters = getReporters;
exports.getBaseJestConfig = getBaseJestConfig;
