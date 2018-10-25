
/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from '../../../steps/commons/login';
import NavigateTo from '../../../steps/commons/navigateTo';
import Entry from '../../../steps/entry';

describe('Test Demo: =====>', () => {
  test({
    title: 'Login with username ${username}, dialer ${selector} text expected "${title}"',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { username: '+18882032020', password: 'Test!123', selector: '@toTitle', title: 'To:'},
    ],
  }, async ({ option, isVirtual }) => {
    // 1. login CTI
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
    )(context);
    await process.exec();
    // 2. check 'toTitle' text
    const fromNumber = await $(app).getText(option.selector);
    expect(fromNumber).toBe(option.title);
  });
});