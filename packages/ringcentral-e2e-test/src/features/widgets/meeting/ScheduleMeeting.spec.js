/* eslint-env node, jest */
/* global $, page, browser */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';

describe('test: =====>', () => {
  test({
    title: 'Login button ${selector} text is ${expected}',
    tags: [
      ['widgets'],
      // ['salesforce']
    ],
    // drivers: ['seleniumWebdriverFirefox'],
    // modes: ['sandbox'],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    // const text = await browser.text(option.selector);
    // expect(text).toBe(option.expected);
    expect(browser.program.shallow(<Button>ttt</Button>).text()).toBe('ttt');
  });
});
