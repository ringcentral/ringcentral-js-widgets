const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/next-jest.config');

module.exports = merge(baseConfig, {
  roots: ['<rootDir>/src'],
  setupFiles: [
    '@ringcentral-integration/mock/setup.ts',
    '<rootDir>/test/jest.setup.ts',
  ],
});
