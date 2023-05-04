/**
 * RCI-1060: Call control_hang up
 * https://test_id_domain/test-cases/RCI-1060
 * Preconditions:
 * 2. User has logged into RC CTI App
 * 3. There is an active Conference Call
 * Account type(/s):RC US, CA, AU,UK, EU, TELUS, BT
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * Conference Call call contorl page
 */

import {
  p1,
  it,
  autorun,
  examples,
  StepFunction,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  MockConferenceCall,
  MockTelephonySession,
  MockBringInToConference,
} from '../../../../../../steps/Mock';
import {
  CheckActiveCallHidden,
  CallButtonBehavior,
  ClickAddButton,
  ClickMergeButton,
  MakeCall,
  CheckConferenceCallControlPage,
  CheckConferenceInfoPage,
} from '../../../../../../steps/Call';
import {
  NavigateToDialer,
  CheckRouterNavigation,
} from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p1
@title('Call control_hang up')
export class RCI1060 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  conferenceCallId: string = '';
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Call control_hang up">
        <When
          desc="Log in CTI"
          action={[
            Login,
            (_: any, { phone }: any) => {
              jest.spyOn(phone.webphone, 'hangup');
            },
          ]}
        />
        <When
          desc="Click the call button"
          action={[NavigateToDialer, <MakeCall phoneNumber="+18882556247" />]}
        />
        <And
          desc="Add a call"
          action={[ClickAddButton, <MakeCall phoneNumber="+18882556241" />]}
        />
        <Then
          desc="Check the conference call control page"
          action={CheckConferenceCallControlPage}
        />
        <When
          desc="Merge a call"
          action={[
            MockConferenceCall,
            MockBringInToConference,
            MockTelephonySession,
            ClickMergeButton,
            CheckConferenceInfoPage,
          ]}
        />
        <When
          desc="get current call session id"
          action={[
            (_: any, { phone }: any) => {
              this.conferenceCallId = phone.webphone.sessions.find((item) =>
                item.id.includes('conf'),
              )?.id;
            },
          ]}
        />
        <And
          desc="Press the Hang Up button"
          action={<CallButtonBehavior callButtonBehaviorType="hangup" />}
        />
        <Then
          desc="1. The Conference Call call control page is closed, and user directs to dialer page.
								2. All participants are ended from the call."
          action={[
            CheckActiveCallHidden,
            <CheckRouterNavigation toPage="Dialer" />,
            (_: any, { phone }: any) => {
              // The conference call is ended
              expect(phone.webphone.hangup).toBeCalledWith(
                this.conferenceCallId,
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
