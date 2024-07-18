import { transform } from '@babel/core';

import crius from '../lib';

describe('crius preset', () => {
  test('does throw clear error when no options passed for Babel 6', () => {
    expect(() => {
      crius({ version: '6.5.0' });
    }).toThrow(Error, /Requires Babel "\^7.0.0-0"/);
  });
  test('set preset with empty-options', () => {
    const actual = transform('<Foo bar="baz" />', {
      presets: [[require.resolve('../lib'), {}]],
    }).code;
    expect(actual).toEqual(
      `"use strict";

Crius.createFlow(Foo, {
  bar: "baz"
});`,
    );
  });
  test('set preset with no-options', () => {
    const actual = transform('<Foo bar="baz" />', {
      presets: [require.resolve('../lib')],
    }).code;
    expect(actual).toEqual(
      `"use strict";

Crius.createFlow(Foo, {
  bar: "baz"
});`,
    );
  });
  test('set preset with development', () => {
    const actual = transform('<Foo bar="baz" />', {
      presets: [[require.resolve('../lib'), { development: true }]],
      filename: '/fake/path/mock.js',
    }).code;
    expect(actual).toEqual(
      `"use strict";

var _jsxFileName = "/fake/path/mock.js";
Crius.createFlow(Foo, {
  bar: "baz",
  __self: void 0,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 1,
    columnNumber: 1
  }
});`,
    );
  });
});
