/* eslint-disable */

import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from '../../steps';
import Login from 'ringcentral-e2e-test/src/steps/salesforce/login';
import NavigateTo from 'ringcentral-e2e-test/src/steps/salesforce/navigateTo';
import Entry from 'ringcentral-e2e-test/src/steps/entry';
import SettingMyRCPhone from 'ringcentral-e2e-test/src/steps/salesforce/settingMyRCPhone'
import Logout from 'ringcentral-e2e-test/src/steps/salesforce/logout'

describe('Test Demo: =====>', () => {
  test({
    title: 'setting My RC Phone',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { accountTag: 'rc_uk_sfentity', username: '+448451030178*301', password: 'Test!123'},
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      SettingMyRCPhone,
      Logout,
    )(context);
      await process.execTo(SettingMyRCPhone);
      context.driver.addAfterHook(async () => {
        await process.exec(Logout);
      });
      const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
      expect(RCPhone.trim()).toBe('My RingCentral Phone');
  });
});
