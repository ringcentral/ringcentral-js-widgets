module.exports = {
  roots: ['<rootDir>/__test__'],
  testRunner: 'jasmine2',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'assets/images/.+?\\.svg$': '<rootDir>/__test__/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
      '<rootDir>/__test__/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__test__/__mocks__/styleMock.js',
  },
  transform: {
    'loadLocale\\.(t|j)s$': '<rootDir>/__test__/__mocks__/loadLocale.js',
    '^.+\\.(t|j)sx?$':
      '@ringcentral-integration/babel-settings/lib/jestTransform.js',
  },
  setupFiles: [
    '<rootDir>/__test__/support/shim.js',
    '<rootDir>/__test__/support/setup.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./legacyTest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'jest-report.html',
        expand: true,
      },
    ],
  ],
};
