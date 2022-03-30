"use strict";

module.exports = {
  transform: {
    '^.+\\.js$': '@ringcentral-integration/babel-settings/lib/jestTransform.js'
  },
  watchPathIgnorePatterns: ['localization/.*', 'testData/.*'],
  reporters: ['default', ['jest-html-reporters', {
    publicPath: './html-report',
    filename: 'jest-report.html',
    expand: true
  }]]
};
//# sourceMappingURL=jest.config.js.map
