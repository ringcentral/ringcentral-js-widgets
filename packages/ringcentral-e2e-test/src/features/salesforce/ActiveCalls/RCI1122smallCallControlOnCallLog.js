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
import CallPhone from 'ringcentral-e2e-test/src/steps/salesforce/outboundCall/outboundCall';
import AnswerCallFromCTI from 'ringcentral-e2e-test/src/steps/salesforce/outboundCall/webPhoneAnswerCall';

describe('Test Case RCI1122: =====>', () => {
  test({
    title: 'small call control on call log section when there is an inbound call',
    tags: [
      // ['widgets'],
      ['salesforce',
        {
        modes: ['classic'],
        drivers: ['puppeteer']
        }],
    ],
    levels: ['p0'],
    loginAccount: ['rc_uk_common'],
    options: [{ 
      callingType: 'myRCPhone',
      loginAccount: 'rc_uk_sfentity',
      otherAccount: ['rc_us_sfentity'] 
    }],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      Entry,
      Login,
      NavigateTo,
      operateWebPhone,
      MakeCall,
      AnswerCall,
      // Hangup,
      // settingMyRCPhone,
      // CallPhone,
      // AnswerCallFromCTI,
      Logout,
    )(context);
    // await process.execTo(settingMyRCPhone);
    // context.driver.addAfterHook(async () => {
    //   await process.exec(Logout);
    // });
    await process.execTo(MakeCall);
    await $(app).waitFor(1000);

    // find the call log section
    await $(app).waitForSelector('[class*=InsideModal-_styles_title]', { selector: 'css' });
    let logCall = await $(app).getText('[class*=InsideModal-_styles_title]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');

    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
    await $(app).waitForSelector('[class*=SmCallControl-_styles_hangup]', { selector: 'css', visible: true });
    let callStatus = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    await console.log(callStatus);
    expect(callStatus.trim()).toBe('Ringing');

    // click left section of basic infor
    await $(app).waitForSelector('[class*=callInfo]', { selector: 'css' });
    await $(app).click('[class*=callInfo]', { selector: 'css' });
    logCall = await $(app).getText('[class*=InsideModal-_styles_title]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');
    // await $(app).click('[class*=SaveLogButton-_styles_primaryButton]');

    await process.execTo(AnswerCall);
    await $(app).waitFor(5000);
    await $(app).waitForSelector('[class*=LogSection-_styles_callCtrlWrapper] [class*=SmCallControl-_styles_button]', { selector: 'css', visible: true });
    await $(app).getText('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    callStatus = await $(app).getText('[class*=LogBasicInfo-_styles_green]', { selector: 'css' });
    await console.log(callStatus);
    expect(callStatus.trim()).toBe('Connected');

    // click left section of basic infor
    await $(app).waitForSelector('[class*=callInfo]', { selector: 'css' });
    await $(app).click('[class*=callInfo]', { selector: 'css' });
    let backButton = await $(app).getText('[class*=backLabel]', { selector: 'css' });
    expect(backButton.trim()).toBe('All calls');

    // click back button
    await $(app).click('[class*=backLabel]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');

    //click mute button
    // await $(app).waitForSelector('[class*=SmCallControl-_styles_button]', { selector: 'css' });
    await $(app).click('[class*=SmCallControl-_styles_button]', { selector: 'css' });
    let smallCallBtn = await $(app).waitForSelector('[class*=SmCallControl-_styles_button_3W-Rb]>title', { selector: 'css' });
    let muteButton = await $(app).getText(smallCallBtn);
    await console.log("smallCallBtn", smallCallBtn);
    expect(muteButton.trim()).toBe('Unmute');

    // click unmute button
    await $(app).click('[class*=SmCallControl-_styles_button_3W-Rb]', { selector: 'css' });
    muteButton = await $(app).getText('[class*=SmCallControl-_styles_button_3W-Rb]>title', { selector: 'css' });
    await console.log("muteButton", muteButton);
    expect(muteButton.trim()).toBe('Mute'); 

    // click Hang up
    await $(app).click('[class*=SmCallControl-_styles_hangup]', { selector: 'css', visible: true });
    callStatus = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    expect(callStatus.trim()).toBe('Disconnected');

    await console.log('=======');

    // await process.execTo(Hangup);
    await $(app).waitFor(5000);
    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
    await $(app).waitFor(100000);
  });

  test.skip({
    title: 'small call control on call log section when there is an outbound call',
    tags: [
      // ['widgets'],
      ['salesforce'],
    ],
    levels: ['p0'],
    loginAccount: ['rc_uk_common'],
    options: [{ 
      callingType: 'myRCPhone',
      loginAccount: 'rc_uk_common',
      otherAccount: ['rc_us_common'] 
      }],
  }, async ({ option, isVirtual }) => {
    const process = createProcess(
      // Entry,
      // Login,
      NavigateTo,
      settingMyRCPhone,
      operateWebPhone,
      CallPhone,
      AnswerCallFromCTI,
      Hangup,
      // Logout,
    )(context);
    // await process.execTo(settingMyRCPhone);
    // context.driver.addAfterHook(async () => {
    //   await process.exec(Logout);
    // });
    await process.execTo(CallPhone);
    await $(app).waitFor(1000);

    // find the call log section
    await $(app).waitForSelector('[class*=InsideModal-_styles_title]', { selector: 'css' });
    let logCall = await $(app).getText('[class*=InsideModal-_styles_title]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');


    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
    await $(app).waitForSelector('[class*=SmCallControl-_styles_hangup]', { selector: 'css', visible: true });
    let callStatus = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    await console.log(callStatus);
    expect(callStatus.trim()).toBe('Ringing');

    // click left section of basic infor
    await $(app).waitForSelector('[class*=callInfo]', { selector: 'css' });
    await $(app).click('[class*=callInfo]', { selector: 'css' });
    logCall = await $(app).getText('[class*=InsideModal-_styles_title]', { selector: 'css' });
    expect(logCall.trim()).toBe('Log Call');
    // await $(app).click('[class*=SaveLogButton-_styles_primaryButton]');

    await process.execTo(AnswerCallFromCTI);
    await $(app).waitFor(5000);
    await $(app).waitForSelector('[class*=LogSection-_styles_callCtrlWrapper] [class*=SmCallControl-_styles_button]', { selector: 'css', visible: true });
    await $(app).getText('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    callStatus = await $(app).getText('[class*=LogBasicInfo-_styles_green]', { selector: 'css' });
    await console.log(callStatus);
    expect(callStatus.trim()).toBe('Connected');

    // click left section of basic infor
    await $(app).waitForSelector('[class*=callInfo]', { selector: 'css' });
    await $(app).click('[class*=callInfo]', { selector: 'css' });
    let backButton = await $(app).getText('[class*="backLabel"]', { selector: 'css' });
    expect(logCall.trim()).toBe('All calls');

    await $(app).click('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    await console.log('=======');
    await process.execTo(Hangup);
    await $(app).waitFor(2000);
    await $(app).waitForSelector('[class*=SmCallControl-_styles_buttonDisabled]', { selector: 'css', visible: false });
  });
});