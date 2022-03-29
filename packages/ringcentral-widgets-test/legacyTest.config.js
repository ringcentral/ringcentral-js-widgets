const baseConfig = require('@ringcentral-integration/test-utils/config/legacy-jest.config');
const merge = require('@ringcentral-integration/test-utils/lib/merge');

module.exports = {
  ...merge(baseConfig, {
    testRunner: 'jasmine2',
    setupFiles: [
      '<rootDir>/__test__/support/shim.js',
      '<rootDir>/__test__/support/setup.js',
    ],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupFilesAfterEnv: ['./legacyTest.setup.js'],
  }),
};
