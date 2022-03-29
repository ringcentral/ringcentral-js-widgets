const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/jest.config');

module.exports = {
  ...merge(baseConfig, {
    moduleNameMapper: {
      '@SDK': '<rootDir>/lib/EvClient/__SDK__/agentLibrary.dev.js',
    },
    setupFiles: [
      '<rootDir>/test/support/shim.js',
      '<rootDir>/test/support/setup.js',
    ],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupFilesAfterEnv: ['./test/jest.setup.js'],
  }),
  roots: ['<rootDir>'],
};
