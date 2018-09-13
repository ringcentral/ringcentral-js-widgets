/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from '../../../steps/commons/login';
import Entry from '../../../steps/entry';

describe('Test Demo: =====>', () => {
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
  //     ['widgets', { brands: ['rc', 'att'] }],
  //   ],
  //   brands: ['rc'],
  //   levels: ['p0'],
  //   options: [
  //     { selector: 'loginButton', expected: 'Sign In' },
  //   ],
  // }, async ({ option }) => {
  //   const text = await $(page).getText(option.selector);
  //   expect(text).toBe(option.expected);
  // });

  test({
    title: 'Login with username ${username}, dialer "fromField" number expected ${isVirtual?mockNumber:number}',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { username: '+18552085709*103', password: 'Test!123', selector: 'fromField', number: '(209) 231-3333', mockNumber: '(209) 841-5555' },
    ],
  }, async ({ option, isVirtual }) => {
    const expectedValue = isVirtual ? option.mockNumber : option.number;
    // 1. login CTI
    const process = createProcess(
      Entry,
      Login,
    )(context);
    await process.exec();
    // 2. check fromField 'fromNumber'
    const fromNumber = await $(app).getText(option.selector);
    expect(fromNumber).toBe(expectedValue);
  });
});
