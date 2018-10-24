/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import NavigateTo from '../../../steps/commons/navigateTo';
import Entry from '../../../steps/entry';

describe('Test Demo: =====>', () => {
  // test({
  //   title: 'unit testing',
  //   tags: [['widgets']],
  //   drivers: ['UT'],
  //   levels: ['p0'],
  //   options: [
  //     { text: 'test', expected: 'test' },
  //     { text: 'test1', expected: 'test1' },
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
  //     { text: 'test1', expected: 'test1' },
  //   ],
  // }, async ({ option }) => {
  //   expect(driver.program.shallow(<Button>{option.text}</Button>).text()).toBe(option.expected);
  // });
  // function check() {
  //   console.log(browser.targets().map(tar => ({
  //     type: tar.type(),
  //     url: tar.url()
  //   })));
  // }

  test({
    title: 'button text with select ${selector} expected ${expected} ',
    tags: [
      ['widgets', { brands: ['rc', 'att'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      { selector: '[class*=loginButton]', expected: 'Sign In' },
    ],
  }, async ({ option }) => {
    const text = await $(page).getText(option.selector);
    expect(text).toBe(option.expected);
  });

  // test({
  //   title: 'Login with username ${username}, dialer ${selector} text expected "${title}"',
  //   tags: [
  //     ['widgets'],
  //     // ['salesforce'],
  //   ],
  //   levels: ['p0'],
  //   options: [
  //     { username: '+18552085709*103', password: 'Test!123', selector: 'toTitle', title: 'To:'},
  //   ],
  // }, async ({ option, isVirtual }) => {
  //   // 1. login CTI
  //   const process = createProcess(
  //     Entry,
  //     Login,
  //     NavigateTo,
  //   )(context);
  //   await process.exec();
  //   // 2. check 'toTitle' text
  //   const fromNumber = await $(app).getText(option.selector);
  //   expect(fromNumber).toBe(option.title);
  // });
});
