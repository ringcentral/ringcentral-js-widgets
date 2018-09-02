/* eslint-env node, jest */
/* global $, page, browser */

describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      // ['widgets'],
      ['salesforce']
    ],
    drivers: ['seleniumWebdriverFirefox'],
    modes: ['sandbox'],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
});
