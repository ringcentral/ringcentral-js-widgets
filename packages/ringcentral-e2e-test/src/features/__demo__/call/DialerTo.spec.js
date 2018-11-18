
/* eslint-disable */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from '../../../steps';
import Login from '../../../steps/commons/login';
import NavigateTo from '../../../steps/commons/navigateTo';
import Entry from '../../../steps/entry';

describe('Test Demo: =====>', () => {
  test({
    title: 'Login with username, dialer ${selector} text expected "${title}"',
    tags: [
      ['widgets'],
    ],
    levels: ['p0'],
    options: [
      { callingType: 'myRCPhone', selector: '@toTitle', title: 'To:', accounts: ['CM_RC_EU', 'CM_RC_UK'], },
    ],
  }, async ({ option, isVirtual }) => {
    // 1. login CTI
    const process = createProcess(
      Entry,
      Login(),
      NavigateTo('dialer'),
    )(context);
    await process.exec();
    // 2. check 'toTitle' text
    const fromNumber = await $(app).getText(option.selector);
    expect(fromNumber).toBe(option.title);
  });
});