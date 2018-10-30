/* eslint-disable */ 
/* RCI-1122: Small Call Control in Call Log Section
http://einstein.int.ringcentral.com/?project=1309&suite=11034&suite=12337&case=16066

Summary:
  Goal: Verify  small call control in call log section behave well

  Priority: P1

  User Story: 
    RCINT-8248: Small Call Control in Call Log Section
    https://jira.ringcentral.com/browse/RCINT-8248
  
  Keywords:
    Automation Ready, Functionality, Salesforce, Salesforce_6.0

  Preconditions:
    1. RC CTI app was installed and enabled 
    2. User has logged in to 3rd party
    3. User has logged in to CTI
    
    Account type(/s): RC US/CA/UK/EU/AU, Telus, BT, AT&T
    Extension type(/s): 
    1.Make an inbound call
    2.Make an outbound call and answer the call
    Note: Make an outbound call and keep the callee(the second leg) on ringing, the Mute button on call log section is enabled.
    Entry point(/s):

Created By	klay.chen
Date Created	Mon, 08 Oct 2018 16:47:34
Updated By	klay.chen
Date Updated	Wed, 24 Oct 2018 13:52:10
 */
/* global $, page, browser, driver, context, app */
/* eslint-enable */

import { createProcess } from 'marten';
import Entry from '../../../steps/entry';
import { LoginCTI } from '../../../steps/commons/login';
import NavigateToSetting from '../../../steps/commons/navigateToSetting';
import SetCallingSetting from '../../../steps/commons/Setting/setCallingSetting';
import MakeInboundCall from '../../../steps/commons/Call/makeInboundCall';
import ClickLeftCallLogSectionInfo from '../../../steps/commons/CallLogSection/clickLeftCallLogSectionInfo';
import RejectCall from '../../../steps/commons/Call/rejectCall';
import AnswerInboundCall from '../../../steps/commons/Call/answerInboundCall';
import MuteCall from '../../../steps/commons/Call/muteCall';
import UnmuteCall from '../../../steps/commons/Call/unmuteCall';
import CloseCallLogSection from '../../../steps/commons/CallLogSection/closeCallLogSection';
import Hangup from '../../../steps/commons/Call/hangup';
import MakeOutboundCall from '../../../steps/commons/Call/makeOutboundCall';
import AnswerOutboundCall from '../../../steps/commons/Call/answerOutboundCall';

describe('Commom ActiveCalls: =====>', () => {
  test({
    title: 'Small Call Control in Call Log Section',
    tags: [
      ['salesforce'],
    ],
    levels: ['p1'],
    options: [
      { accounts: ['CM_RC_US'], callingType: 'myRCPhone' },
    ],
  }, async () => {
    let process = createProcess(
      Entry,
      LoginCTI,
      NavigateToSetting,
      SetCallingSetting,
      MakeInboundCall,
      ClickLeftCallLogSectionInfo,
      RejectCall,
    )(context);
    /*
    __Step1__: Direct to entry point 1.
    [Expected Result]:
    Call log section pop up with two button in the right side of the call info area:
    'Mute' button and it's disabled
    'Reject' button and it's enabled
    */
    await process.execTo(MakeInboundCall);
    expect(await MakeInboundCall.getIsMuteButtonDisabled(context)).toBeTruthy();
    expect(await MakeInboundCall.getIsRejectButtonEnabled(context)).toBeTruthy();

    /*
    __Step2__: Click the left section of basic information on call log section.
    [Expected Result]: Stay on call log page without navigating to call control page
    */
    await process.execTo(ClickLeftCallLogSectionInfo);
    expect(await ClickLeftCallLogSectionInfo.getIsStayAllCallsPage(context)).toBeTruthy();

    /*
    __Step3__: Click the 'Reject' button
    [Expected Result]: Call is hanged up
    */
    await process.execTo(RejectCall);
    expect(await RejectCall.getIsCallHangup(context)).toBeTruthy();

    process = createProcess(
      Hangup,
      CloseCallLogSection,
      MakeInboundCall,
      AnswerInboundCall,
      MuteCall,
      UnmuteCall,
      ClickLeftCallLogSectionInfo,
      CloseCallLogSection,
    )(context);
    /*
    __Step4__: Repeat step 1 and answer the call
    [Expected Result]: 'Mute' button should be enabled
    */
    await process.execTo(AnswerInboundCall);
    expect(await MakeInboundCall.getIsMuteButtonEnabled(context)).toBeTruthy();

    /*
    __Step5__: Click the 'Mute' button
    [Expected Result]: Call is muted and 'Mute' button should be changed to 'Unmute' button
    */
    await process.execTo(MuteCall);
    expect(await MuteCall.getIsCallMuted(context)).toBeTruthy();
    expect(await MuteCall.getIsUnmuteButtonDisplay(context)).toBeTruthy();

    /*
    __Step6__: Click the 'Unmute button
    [Expected Result]: Call is unmuted and 'Unmute' button should be changed to 'Mute' button
    */
    await process.execTo(UnmuteCall);
    expect(await UnmuteCall.getIsCallUnmuted(context)).toBeTruthy();
    expect(await UnmuteCall.getIsMuteButtonDisplay(context)).toBeTruthy();

    /*
    __Step7__: Click the left section of basic information
    [Expected Result]: Navigate to call control page
    */
    await process.execTo(ClickLeftCallLogSectionInfo);
    expect(await ClickLeftCallLogSectionInfo.getIsNavigateToCallControlPage(context)).toBeTruthy();

    process = createProcess(
      Hangup,
      CloseCallLogSection,
      MakeOutboundCall,
      AnswerOutboundCall,
      Hangup,
      ClickLeftCallLogSectionInfo,
    )(context);
    /*
    __Step8__: Hang up the call and direct to entry point 2
    [Expected Result]:
    Call log section pop up with two button in the right side of the call info area:
    'Mute' button and it's enabled
    'Hang up' button and it's enabled
    */
    await process.execTo(AnswerOutboundCall);
    expect(await AnswerOutboundCall.getIsMuteEnabled(context)).toBeTruthy();
    expect(await AnswerOutboundCall.getIsHangupEnabled(context)).toBeTruthy();

    /*
    __Step9__: Click the 'Hang up' button
    [Expected Result]:
    Call is hanged up
    Call log section should pop up again with:
    no 'Mute' button
    no 'Hang up' button
    */
    await process.execTo(Hangup);
    expect(await Hangup.getIsHangupCall(context)).toBeTruthy();
    expect(await Hangup.getIsMuteButtonHidden(context)).toBeTruthy();
    expect(await Hangup.getIsHangupButtonHidden(context)).toBeTruthy();

    /*
    __Step10__: Click the left section of basic information on call log section
    [Expected Result]: Stay on call log section without navigating to call control page
    */
    await process.execTo(ClickLeftCallLogSectionInfo);
    expect(await ClickLeftCallLogSectionInfo.getIsStayAllCallsPage(context)).toBeTruthy();
  });
});
