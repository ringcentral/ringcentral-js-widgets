/* eslint-disable */

import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from '../../steps';
import Login from 'ringcentral-e2e-test/src/steps/salesforce/login';
import NavigateTo from 'ringcentral-e2e-test/src/steps/salesforce/navigateTo';
import Entry from 'ringcentral-e2e-test/src/steps/entry';
import Settings from 'ringcentral-e2e-test/src/steps/salesforce/settings'
import Logout from 'ringcentral-e2e-test/src/steps/salesforce/logout'

describe('use steps&PO Test Demo: =====>', () => {

  // test({
  //   title: 'Login with username ${username}, dialer ${selector} text expected "${title}"',
  //   tags: [
  //     // ['widgets'],
  //     ['salesforce'],
  //   ],
  //   levels: ['p0'],
  //   options: [
  //     { accountTag: 'rc_uk_sfentity', username: '+18552085709*103', password: 'Test!123', selector: 'numberInput', title: 'Enter Name or Number'},
  //   ],
  // }, async ({ option, isVirtual }) => {
  //   // 1. login CTI
  //   const process = createProcess(
  //     Entry,
  //     Login,
  //     NavigateTo,
  //   )(context);
  //   await process.exec();
  //   const numberInput = await $(app).getText('[class*="RecipientsInput"]');
  //   expect(numberInput).toBe(option.title);
  //   // 2. check 'toTitle' text
  //   // const fromNumber = await $(app).getText(option.selector);
  //   // expect(fromNumber).toBe(option.title);
  // });
  test({
    title: 'setting My RC Phone',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { accountTag: 'rc_uk_sfentity',username: '+448451030178*301', password: 'Test!123'},
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      Settings,
      Logout,
    )(context);
      await process.execTo(Settings.settingMyRCPhone);
      await process.skip(Settings.settingRCPhoneDesktop);
      context.driver.addAfterHook(async () => {
        await process.exec(Logout);
      });
      const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
      expect(RCPhone.trim()).toBe('My RingCentral Phone');
  });
  test({
    title: 'setting RingCentral for Desktop',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { accountTag: 'rc_uk_sfentity',username: '+18882117455*101', password: 'Test!123'},
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      Settings,
      Logout,
    )(context);
      await process.execBefore(Settings.settingMyRCPhone);
      await process.skip(Settings.settingMyRCPhone);
      await process.execTo(Settings.settingRCPhoneDesktop);
      context.driver.addAfterHook(async () => {
        await process.exec(Logout);
      });
      const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
      expect(RCPhone.trim()).toBe('RingCentral for Desktop');
  });
  
});
