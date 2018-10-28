/* eslint-disable */

/* eslint-env node, jest */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { shallow } from 'enzyme';

describe('test: =====>', () => {
  // test({
  //   title: 'unit testing',
  //   tags: [['widgets']],
  //   drivers: ['UT'],
  //   levels: ['p0'],
  //   options: [
  //     { text: 'test', expected: 'test' },
  //   ],
  // }, async ({ option }) => {
  //   expect(option.text).toBe(option.expected);
  // });
  // test({
  //   title: 'component unit testing',
  //   tags: [['widgets']],
  //   drivers: ['enzymeUT'],
  //   levels: ['p0'],
  //   options: [
  //     { text: 'test', expected: 'test' },
  //   ],
  // }, async ({ option }) => {
  //   expect(driver.program.shallow(<Button>{option.text}</Button>).text()).toBe(option.expected);
  // });
  // test({
  //   title: 'button text with select ${selector} expected ${expected} ',
  //   tags: [
  //     ['widgets', { brands: ['rc', 'att'], mock: ['server1'] }],
  //   ],
  //   brands: ['rc'],
  //   levels: ['p0'],
  //   options: [
  //     { selector: 'loginButton', expected: 'Sign In2' },
  //     { selector: 'loginButton', expected: 'Sign In1' },
  //   ],
  // }, async ({ option }) => {
  //   const text = await $(page).text(option.selector);
  //   driver.addAfterHook(async () => {
  //     await driver.page.screenshot({ path: 'screenshot.png' });
  //   });
  //   expect(text).toBe(option.expected);
  // });
  test({
    title: 'Create Meeting',
    tags: [
      // ['widgets'],
      ['salesforce']
    ],
    // modes: ['sandbox'],
    // brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[data-sign="loginButton"]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).text(option.selector);
    expect(text).toBe(option.expected);
  });
});
