/**
 * RCI-1836: Alert when error status for call control button
 * https://test_it_domain/test-cases/RCI-1836
 * Preconditions:
 * 1. User is logged into Salesforce.
 * 2. User is logged in RC CTI App
 * 3. User selects Browser mode in Settings > Calling
 * 4. There is no other active webRTC call
 * Entry point(/s):
 * 1. User is logged into Salesforce.
 * 2. User is logged in RC CTI App
 * 3. User selects Browser mode in Settings > Calling
 * 4. There is no other active webRTC call
 * Account type(/s):
 * Extension type(/s):
 * Entry point(/s): 1. Make an incoming call and not answer
 * 2. Make an inbound/outbound call and answer
 * 3. Initial warm transfer(Only for Salesforce)
 */
import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CheckContainsAlertMessage,
  CloseAlertMessage,
} from '../../../steps/Alert';
import {
  CheckSmallControlButton,
  ClickMuteButton,
  ClickUnHoldButton,
  MakeOtherDeviceCall,
  MakeOutboundCall,
} from '../../../steps/Call';
import { CheckInCallLogPage } from '../../../steps/CallLog';
import type { LoginProps } from '../../../steps/CommonLogin';
import { CommonLogin } from '../../../steps/CommonLogin';
import { MockMuteFail } from '../../../steps/Mock';
import { MockUnHoldCallFail } from '../../../steps/Mock/MockUnHoldCallFail';
import { NavigateToDialer } from '../../../steps/Navigate';
import { NetworkOff } from '../../../steps/Network';
import { ClickCallButton, InputToField } from '../../../steps/dialer';

@autorun(test.skip)
@common
@it
@p2
@title('Alert when error status for call control button')
export class CallControlWith409Conflict extends Step {
  Login: StepFunction<LoginProps, any> = CommonLogin;
  run() {
    return (
      <Scenario
        desc="check call control with all kinds of error status"
        action={this.Login}
      >
        <When
          desc="Go to dialer page, do not input anything or input invalid phone number eg: abhs, click call button"
          action={[
            NavigateToDialer,
            <InputToField input="abhs" />,
            ClickCallButton,
          ]}
        />
        <Then
          desc="Error message should show: 'Please enter a valid phone number.
										[L10N]"
          action={[
            <CheckContainsAlertMessage message="Please enter a valid phone number." />,
            CloseAlertMessage,
          ]}
        />
        <When
          desc="Make an other device inbound/outbound call and answer and hold call on other device"
          action={
            <MakeOtherDeviceCall
              status={PartyStatusCode.hold}
              direction={callDirection.inbound}
            />
          }
        />
        <Then
          desc="Call log section will open with call control button"
          action={CheckInCallLogPage}
        />
        <Then
          desc="Call should be hold status on CTI and hold button will change to Unhold"
          action={<CheckSmallControlButton callButtonBehaviorType="onHold" />}
        />
        <When
          desc="Click unhold button on call log section"
          action={[MockUnHoldCallFail, ClickUnHoldButton]}
        />
        <Then
          desc="Alert should show:
										This call had been held on another device. Please unhold the call before you take control in this App.'
										[L10N]"
          action={[
            <CheckContainsAlertMessage message="This call had been held on other device. Please unhold the call before you control in this App" />,
          ]}
        />
        {/*
        TODO: after added switch function
        <When
          desc="Direct to entry point3, simulate failedcondition(It's not just about cutting off the Internet) Click 'Switch' button"
          action={}
        />
        <Then
          desc="The switch button will be enabled.
										An error message will pop up - 'Unexpected error. Try again later.'
										The call base info session will not be changed."
          action={}
        /> */}
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Call control buttons disabled when network off')
export class CallControlDisabledWhenNetworkOff extends Step {
  Login: StepFunction<LoginProps, any> = CommonLogin;
  run() {
    return (
      <Scenario
        desc="check call control with all kinds of error status"
        action={this.Login}
      >
        <When
          desc="Make an outbound call and answer, disconnect network"
          action={[MakeOutboundCall, NetworkOff]}
        />
        <Then
          desc="Call control button will become disabled"
          action={[
            <CheckSmallControlButton
              callButtonBehaviorType="hangup"
              disabled
            />,
            <CheckSmallControlButton callButtonBehaviorType="mute" disabled />,
            <CheckSmallControlButton
              callButtonBehaviorType="showKeypad"
              disabled
            />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Alert when error status for call control button')
export class CallControlFailWith500Error extends Step {
  Login: StepFunction<LoginProps, any> = CommonLogin;
  run() {
    return (
      <Scenario
        desc="check call control with all kinds of error status"
        action={this.Login}
      >
        <When
          desc="Make an other device inbound/outbound call and answer and hold call on other device"
          action={
            <MakeOtherDeviceCall
              status={PartyStatusCode.answered}
              direction={callDirection.inbound}
            />
          }
        />
        <Then
          desc="Call log section will open with call control button"
          action={CheckInCallLogPage}
        />
        <When
          desc="Simulate failedcondition(It's not just about cutting off the Internet) Click mute/unmute/hold/unhold/record/stop record/hangup/ignore/voicemail/answer/forward button"
          action={[MockMuteFail, ClickMuteButton]}
        />
        <Then
          desc="Error message 'Unexpected server error. Please try again later.' should show
										[L10N]"
          action={
            <CheckContainsAlertMessage message="Unexpected server error. Please try again later." />
          }
        />
      </Scenario>
    );
  }
}
