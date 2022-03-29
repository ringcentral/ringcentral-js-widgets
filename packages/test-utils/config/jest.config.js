const merge = require('../lib/merge');
const { getBaseJestConfig } = require('./getBaseJestConfig');

module.exports = merge(getBaseJestConfig(), {
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: [
    '@ringcentral-integration/test-utils/scripts/testing-library.setupAfterEnv.js',
  ],
});
