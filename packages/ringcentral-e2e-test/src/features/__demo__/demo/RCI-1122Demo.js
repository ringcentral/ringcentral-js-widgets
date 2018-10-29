/* eslint-disable */
/* global $, page, browser, driver, context */
import React from 'react';
import Button from 'ringcentral-widgets/components/Button';
import { createProcess } from 'marten';
import Login from 'ringcentral-e2e-test/src/steps/salesforce/login';
import NavigateTo from 'ringcentral-e2e-test/src/steps/salesforce/navigateTo';
import Entry from 'ringcentral-e2e-test/src/steps/entry';
import SettingMyRCPhone from 'ringcentral-e2e-test/src/steps/salesforce/settingMyRCPhone'
import Logout from 'ringcentral-e2e-test/src/steps/salesforce/logout'
// import WebphoneCall from 'ringcentral-e2e-test/src/steps/salesforce/settingWebphoneCall'
import OperateWebPhone from 'ringcentral-e2e-test/src/steps/salesforce/operateWebPhone'
import MakeCall from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneMakeCall'
import AnswerCall from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneAnswerCall'
import Hangup from 'ringcentral-e2e-test/src/steps/salesforce/webPhoneHangup'
import OutboundCall from 'ringcentral-e2e-test/src/steps/salesforce/outboundCall'
import LogCall from 'ringcentral-e2e-test/src/steps/salesforce/logCall'
import smallCallControl from 'ringcentral-e2e-test/src/steps/salesforce/smallCallControl'

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
      SettingMyRCPhone,
      OperateWebPhone,
      MakeCall,
      AnswerCall,
      smallCallControl,
      Hangup,
      Logout,
    )(context);
    await process.execTo(MakeCall);
    const ringingText = await LogCall.getRingText();
    expect(ringingText.trim()).toBe('Ringing');
    const muteValue = await LogCall.getMuteValue();
    expect(muteValue).toContain('Disabled');
    await process.execTo(AnswerCall);
    const ConnectedText = await LogCall.getRingText();
    expect(ConnectedText.trim()).toBe('Connected');
    const unMuteValue = await LogCall.getMuteValue();
    expect(unMuteValue).not.toContain('Disabled');
    await process.execTo(Hangup);
  });

});

