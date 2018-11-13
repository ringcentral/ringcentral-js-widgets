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
/* eslint-enable */

import { createProcess } from 'marten';
import callingTypes from '../../../enums/callingTypes';
import Entry from '../../../steps/entry';
import { LoginCTI } from '../../../steps/commons/login';
import NavigateToCallingSetting from '../../../steps/commons/navigateToCallingSetting';
import NavigateToDialer from '../../../steps/commons/navigateToDialer';
import SetCallingSetting from '../../../steps/commons/Setting/setCallingSetting';
import ClickLeftCallLogSectionInfo from '../../../steps/commons/SmallCallControl/clickLeftCallLogSectionInfo';
import RejectCall from '../../../steps/commons/SmallCallControl/rejectCall';
import MuteCall from '../../../steps/commons/SmallCallControl/muteCall';
import UnmuteCall from '../../../steps/commons/SmallCallControl/unmuteCall';
import HangupCall from '../../../steps/commons/SmallCallControl/hangupCall';
import AssistMakeInboundCall from '../../../steps/commons/Webphone/assistMakeInboundCall';
import AssistAnswerInboundCall from '../../../steps/commons/Webphone/assistAnswerInboundCall';
import AssistAnswerOutboundCall from '../../../steps/commons/Webphone/assistAnswerOutboundCall';
import AssistHangupCall from '../../../steps/commons/Webphone/assistHangupCall';
import CloseCallLogSection from '../../../steps/commons/CallLogSection/closeCallLogSection';
import DialOutCall from '../../../steps/commons/Dialer/dialOutCall';

describe('Commom ActiveCalls: =====>', () => {
  test({
    title: 'Small Call Control in Call Log Section',
    tags: [
      ['salesforce'],
    ],
    levels: ['p1'],
    options: [
      { accounts: ['CM_RC_US', 'CM_RC_US'], callingType: callingTypes.myPhone },
    ],
  }, async (context) => {
    let process = createProcess(
      Entry,
      LoginCTI,
      NavigateToCallingSetting,
      SetCallingSetting,
      NavigateToDialer,
    )(context);
    await process.exec();
    const { accounts, loginAccount } = context.options.option.playload;
    const AssistMakeInboundCallWithFirstAccount = AssistMakeInboundCall({
      from: accounts[0],
      to: loginAccount
    });
    process = createProcess(
      AssistMakeInboundCallWithFirstAccount,
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
    await process.execTo(AssistMakeInboundCallWithFirstAccount);
    expect(await AssistMakeInboundCallWithFirstAccount.getIsMuteButtonDisabled(context)).toBeTruthy();
    expect(await AssistMakeInboundCallWithFirstAccount.getIsRejectButtonEnabled(context)).toBeTruthy();

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

    const AssistHangupCallWithFirstAccount = AssistHangupCall({
      from: accounts[0],
      to: loginAccount
    });

    const AssistMakeInboundCallWithSecondAccount = AssistMakeInboundCall({
      from: accounts[1],
      to: loginAccount
    });
    const AssistAnswerInboundCallWithSecondAccount = AssistAnswerInboundCall({
      from: accounts[1],
      to: loginAccount
    });
    process = createProcess(
      AssistHangupCallWithFirstAccount,
      CloseCallLogSection,
      AssistMakeInboundCallWithSecondAccount,
      AssistAnswerInboundCallWithSecondAccount,
      MuteCall,
      UnmuteCall,
      ClickLeftCallLogSectionInfo,
      HangupCall,
    )(context);
    /*
    __Step4__: Repeat step 1 and answer the call
    [Expected Result]: 'Mute' button should be enabled
    */
    await process.execTo(AssistAnswerInboundCallWithSecondAccount);
    expect(await AssistAnswerInboundCallWithSecondAccount.getIsMuteButtonEnabled(context)).toBeTruthy();

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

    const AssistHangupCallWithSecondAccount = AssistHangupCall({
      from: accounts[1],
      to: loginAccount
    });
    const AssistAnswerOutboundCallToFirstAccount = AssistAnswerOutboundCall({
      from: loginAccount,
      to: accounts[0],
    });
    // const DialOutCallWithFirstAccount = DialOutCall(accounts[0]);

    process = createProcess(
      // AssistHangupCallWithSecondAccount,
      CloseCallLogSection,
      AssistAnswerOutboundCallToFirstAccount,
      DialOutCall,
      HangupCall,
      ClickLeftCallLogSectionInfo,
    )(context);
    /*
    __Step8__: Hang up the call and direct to entry point 2
    [Expected Result]:
    Call log section pop up with two button in the right side of the call info area:
    'Mute' button and it's enabled
    'Hang up' button and it's enabled
    */
    await process.execTo(DialOutCall);
    expect(await AssistAnswerOutboundCallToFirstAccount.getIsMuteEnabled(context)).toBeTruthy();
    expect(await AssistAnswerOutboundCallToFirstAccount.getIsHangupEnabled(context)).toBeTruthy();

    /*
    __Step9__: Click the 'Hang up' button
    [Expected Result]:
    Call is hanged up
    Call log section should pop up again with:
    no 'Mute' button
    no 'Hang up' button
    */
    await process.execTo(HangupCall);
    expect(await HangupCall.getIsCallHangup(context)).toBeTruthy();
    expect(await HangupCall.getIsMuteButtonHidden(context)).toBeTruthy();
    expect(await HangupCall.getIsHangupButtonHidden(context)).toBeTruthy();

    /*
    __Step10__: Click the left section of basic information on call log section
    [Expected Result]: Stay on call log section without navigating to call control page
    */
    await process.execTo(ClickLeftCallLogSectionInfo);
    expect(await ClickLeftCallLogSectionInfo.getIsStayAllCallsPage(context)).toBeTruthy();
  });
});
