const nodeModules = '<rootDir>/../../node_modules/';

const __CI__ = process.argv.includes('--ci');

module.exports = {
  roots: ['<rootDir>/test'],
  testRunner: 'jest-circus/runner',
  testEnvironment: 'jsdom',
  transform: {
    'loadLocale\\.(js|jsx|ts|tsx)$': `${nodeModules}@ringcentral-integration/test-utils/mock/loadLocale.js`,
    '^.+\\.(js|jsx|ts|tsx)$': `${nodeModules}@ringcentral-integration/babel-settings/lib/jestTransform.js`,
  },
  setupFiles: [
    `${nodeModules}@ringcentral-integration/test-utils/scripts/jest.setup.js`,
  ],
  setupFilesAfterEnv: [
    `${nodeModules}@ringcentral-integration/test-utils/scripts/jest.setupAfterEnv.js`,
  ],
  moduleNameMapper: {
    '\\.svg$': `${nodeModules}@ringcentral-integration/test-utils/mock/svgMock.js`,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$': `${nodeModules}@ringcentral-integration/test-utils/mock/fileMock.js`,
    '\\.(css|less|scss)$': `${nodeModules}@ringcentral-integration/test-utils/mock/styleMock.js`,
  },
  // 'jest-junit' for CI status statistics only
  ...(__CI__
    ? {
        reporters: [
          'default',
          [
            'jest-html-reporters',
            {
              publicPath: './html-report',
              filename: 'crius-report.html',
              expand: true,
            },
          ],
          [
            'jest-junit',
            {
              suiteName: 'jest tests',
              outputDirectory: '<rootDir>/junit-report',
              outputName: './junit.xml',
              classNameTemplate: (vars) =>
                vars.filename.indexOf('RCI-') > -1
                  ? vars.filename.match(/(RCI-[0-9]+)/g)[0]
                  : vars.filename,
              titleTemplate: '{filename}-{title}',
              ancestorSeparator: ' › ',
              usePathForSuiteName: 'true',
            },
          ],
        ],
      }
    : {}),
  globals: {
    __CI__,
  },
};
