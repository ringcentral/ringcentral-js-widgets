"use strict";

var merge = require('@ringcentral-integration/test-utils/lib/merge');
var _require = require('@ringcentral-integration/test-utils/config/getBaseJestConfig'),
  getBaseJestConfig = _require.getBaseJestConfig;
module.exports = merge(getBaseJestConfig(), {
  watchPathIgnorePatterns: ['localization/.*', 'testData/.*'],
  coveragePathIgnorePatterns: ['/node_modules/', 'testData']
});
//# sourceMappingURL=jest.config.js.map
