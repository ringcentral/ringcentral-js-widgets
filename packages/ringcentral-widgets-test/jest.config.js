const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/jest.config');

module.exports = {
  ...merge(baseConfig, {
    setupFiles: [
      '<rootDir>/test/jest.setup.ts',
      '@ringcentral-integration/mock/setup.ts',
    ],
    // add additional jest config
  }),
  roots: ['<rootDir>/test'],
};
