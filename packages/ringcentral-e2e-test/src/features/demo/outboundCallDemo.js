/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from 'ringcentral-e2e-test/src/steps/salesforce/login';
import NavigateTo from 'ringcentral-e2e-test/src/steps/salesforce/navigateTo';
import Entry from 'ringcentral-e2e-test/src/steps/entry';
import settingCustomPhone from 'ringcentral-e2e-test/src/steps/salesforce/settingCustomPhone'
import Logout from 'ringcentral-e2e-test/src/steps/salesforce/logout'
import WebphoneAnswerCall from 'ringcentral-e2e-test/src/steps/salesforce/settingWebphoneAnswerCall'
import outboundCall from 'ringcentral-e2e-test/src/steps/salesforce/outboundCall'

describe('Test Demo: =====>', () => {
  test({
    title: 'setting My RC Phone',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    options: [
      { tagNum: 3, accountTag1: 'rc_uk_sfentity', accountTag2: 'rc_us_sfentity', accountTag3: 'rc_us_sfentity' },
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      WebphoneAnswerCall,
      settingCustomPhone,
      outboundCall,
      // Logout,
    )(context);
    await process.execTo(settingCustomPhone.gotoSettings);
    await process.skip(settingCustomPhone.settingAutoLog);
    await process.execTo(settingCustomPhone.settingCustomPhone);
    // context.driver.addAfterHook(async () => {
    //   await process.exec(Logout);
    // });
    const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
    expect(RCPhone.trim()).toBe('Custom Phone');
    await process.execTo(outboundCall);
    const logCall = await $(app).getText('[class*="InsideModal-_styles_title"]');
    expect(logCall.trim()).toBe('Log Call');
  });
});

