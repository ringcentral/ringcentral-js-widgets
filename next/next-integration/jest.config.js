const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/next-jest.config');

module.exports = merge(baseConfig, {
  // add additional jest config
});
