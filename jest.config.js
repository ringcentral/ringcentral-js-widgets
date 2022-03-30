"use strict";

module.exports = {
  transform: {
    '^.+\\.(j|t)sx?$': '@ringcentral-integration/babel-settings/lib/jestTransform.js'
  },
  reporters: ['default', ['jest-html-reporters', {
    publicPath: './html-report',
    filename: 'jest-report.html',
    expand: true
  }]]
};
//# sourceMappingURL=jest.config.js.map
