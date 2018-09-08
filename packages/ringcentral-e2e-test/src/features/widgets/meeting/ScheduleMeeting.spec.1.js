/* eslint-env node, jest */
/* global $, page, browser */
// import React from 'react';
// import Button from 'ringcentral-widgets/components/Button';
// import getWrapper from '../../../targets/widgets';

describe('test: =====>', () => {
  // test({
  //   title: 'button',
  // }, async ({ option }) => {
  //   expect(browser.program.shallow(<Button>ttt</Button>).text()).toBe('ttt');
  // });
  test({
    title: 'button',
    tags: [
      ['widgets'],
      // ['salesforce']
    ],
    // drivers: ['seleniumWebdriverFirefox'],
    // modes: ['sandbox'],
    // brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
});
