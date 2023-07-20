const merge = require('@ringcentral-integration/test-utils/lib/merge');
const {
  getBaseJestConfig,
} = require('@ringcentral-integration/test-utils/config/getBaseJestConfig');

module.exports = merge(getBaseJestConfig(), {
  watchPathIgnorePatterns: ['localization/.*', 'testData/.*'],
  coveragePathIgnorePatterns: ['/node_modules/', 'testData'],
});
