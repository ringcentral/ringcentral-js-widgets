/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from 'ringcentral-e2e-test/src/steps/salesforce/login';
import NavigateTo from 'ringcentral-e2e-test/src/steps/salesforce/navigateTo';
import Entry from 'ringcentral-e2e-test/src/steps/entry';
import settingMyRCPhone from 'ringcentral-e2e-test/src/steps/salesforce/settingMyRCPhone'
import Logout from 'ringcentral-e2e-test/src/steps/salesforce/logout'
// import WebphoneCall from 'ringcentral-e2e-test/src/steps/salesforce/settingWebphoneCall'
import operateWebPhone from 'ringcentral-e2e-test/src/steps/salesforce/operateWebPhone'
import MakeCall from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneMakeCall'
import AnswerCall from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneAnswerCall'
import Hangup from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneHangup'
import outboundCall from 'ringcentral-e2e-test/src/steps/salesforce/outboundCall'

describe('Test Demo: =====>', () => {
  test({
    title: 'setting My RC Phone',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    accounts: [['rc_uk_common', 'rc_us_common']],
    options: [
      { callingType: 'myRCPhone', accounts: ['rc_uk_common', 'rc_us_common'] }
    ],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      settingMyRCPhone,
      operateWebPhone,
      MakeCall,
      AnswerCall,
      Hangup,
      // Logout,
    )(context);
    await process.execTo(settingMyRCPhone);
    // context.driver.addAfterHook(async () => {
    //   await process.exec(Logout);
    // });
    // const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
    // expect(RCPhone.trim()).toBe('Custom Phone');
    await process.execTo(MakeCall);
    await $(app).waitFor(1000);
    await $(app).waitForSelector('[class*="InsideModal-_styles_title"]', { selector: 'css' });
    const logCall = await $(app).getText('[class*="InsideModal-_styles_title"]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');
    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
    await $(app).waitForSelector('[class*=SmCallControl-_styles_hangup]', { selector: 'css', visible: true });
    const ringing = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    await console.log(ringing);
    expect(ringing.trim()).toBe('Ringing');
    // await $(app).click('[class*=SaveLogButton-_styles_primaryButton]');
    await process.execTo(AnswerCall);
    await $(app).waitFor(5000);
    await $(app).waitForSelector('[class*=LogSection-_styles_callCtrlWrapper] [class*=SmCallControl-_styles_button]', { selector: 'css', visible: true });
    await $(app).getText('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    const connected = await $(app).getText('[class*=LogBasicInfo-_styles_green]', { selector: 'css' });
    await console.log(connected);
    await $(app).click('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    await console.log('=======');
    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
    await $(app).waitFor(100000);
  });

});

