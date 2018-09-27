/* eslint-disable */
/* global $, page, browser, driver, context */

describe('Test Demo: =====>', () => {

  test({
    title: 'button text with select ${selector} expected ${expected} ',
    tags: [
      ['google', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[class*=styles_loginButton]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).getText(option.selector, { selector: 'css' });
    expect(text).toBe(option.expected);
  });

});
