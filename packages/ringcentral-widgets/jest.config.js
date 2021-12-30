const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/jest.config');

module.exports = {
  ...merge(baseConfig, {
    setupFilesAfterEnv: [
      '@ringcentral-integration/test-utils/config/jest.testingLibraryConfig.ts',
    ],
    // add additional jest config
  }),
  roots: ['<rootDir>'],
};
