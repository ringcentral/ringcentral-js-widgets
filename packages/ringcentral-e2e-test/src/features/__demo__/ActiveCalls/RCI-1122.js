/* eslint-disable */
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
    loginAccount: ['rc_uk_common'],
    options: [{ 
      callingType: 'myRCPhone',
      loginAccount: 'rc_uk_common',
      otherAccount: ['rc_us_common'] 
    }],
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
    await process.execTo(MakeCall);
    await $(app).waitFor(5000);
    const unmute = await $(app).getAttributeValue('[class*=SmCallControl-_styles_button]', "class", { selector: 'css', visible: true  });
    expect(unmute).toContain('Disabled');

    await $(app).waitForSelector('[class*=SmCallControl-_styles_hangup]', { selector: 'css', visible: true });

    const ringing = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    expect(ringing.trim()).toBe('Ringing');
    // await $(app).click('[class*=SaveLogButton-_styles_primaryButton]');
    await process.execTo(AnswerCall);
    await $(app).waitFor(5000);

    const mute = await  $(app).getAttributeValue('[class*=SmCallControl-_styles_button]', "class", { selector: 'css' });
    expect(mute).not.toContain('Disabled');

    const connected = await $(app).getText('[class*=LogBasicInfo-_styles_green]', { selector: 'css' });
    expect(connected.trim()).toBe('Connected');

    await $(app).click('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
    await $(app).waitFor(1000);
    const unmute1 = await $(app).getAttributeValue('[class*=SmCallControl-_styles_button]', "class", { selector: 'css' });
    expect(unmute1).toContain('Disabled');
    await $(app).waitFor(3000);
    await process.execTo(Hangup);
  });

});

