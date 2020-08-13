const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/jest.config');

module.exports = {
  ...merge(baseConfig, {
    setupFiles: ['<rootDir>/__test__/jest.setup.ts'],
    // add additional jest config
  }),
  roots: ['<rootDir>/__test__'],
};
