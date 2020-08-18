"use strict";

module.exports = {
  transform: {
    'loadLocale\\.(j|t)s$': '<rootDir>/test/__mocks__/loadLocale.ts',
    '^.+\\.(j|t)sx?$': '@ringcentral-integration/babel-settings/lib/jestTransform.js'
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/__mocks__/svgMock.ts',
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  }
};
//# sourceMappingURL=jest.config.js.map
