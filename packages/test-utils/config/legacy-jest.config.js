const merge = require('../lib/merge');
const { getBaseJestConfig } = require('./getBaseJestConfig');

module.exports = merge(getBaseJestConfig({ reporterPrefix: 'legacy-' }), {
  roots: ['<rootDir>/__test__'],
  setupFilesAfterEnv: [
    '@ringcentral-integration/test-utils/scripts/legacy-jest.setupAfterEnv.js',
  ],
});
