const merge = require('../lib/merge');
const { getBaseJestConfig } = require('./getBaseJestConfig');

module.exports = merge(getBaseJestConfig({ useNextConfig: true }), {
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: [
    '@ringcentral-integration/test-utils/scripts/next-jest.setupAfterEnv.ts',
    '@ringcentral-integration/test-utils/scripts/testing-library.setupAfterEnv.js',
    '@ringcentral-integration/test-utils/scripts/next-jest.teardown.js',
  ],
});
