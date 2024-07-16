/**
 * RCI-1060: Call control_hang up
 * https://test_it_domain/test-cases/RCI-1060
 * Preconditions:
 * 2. User has logged into RC CTI App
 * 3. There is an active Conference Call
 * Account type(/s):RC US, CA, AU,UK, EU, TELUS, BT
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * Conference Call call contorl page
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p1,
  title,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  CheckActiveCallHidden,
  CheckConferenceCallControlPage,
  CheckConferenceInfoPage,
  ClickAddButton,
  ClickMergeButton,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import {
  MockBringInToConference,
  MockConferenceCall,
  MockMessageSync,
  MockTelephonySession,
} from '../../../../../../steps/Mock';
import {
  CheckRouterNavigation,
  NavigateToDialer,
} from '../../../../../../steps/Navigate';

@autorun(test)
@it
@p1
@common
@title('Call control_hang up')
export class RCI1060 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  conferenceCallId = '';
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Call control_hang up">
        <When
          desc="Log in CTI"
          action={[
            <Login />,
            <MockMessageSync />,
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
              expect(phone.webphone.hangup).toHaveBeenCalledWith(
                this.conferenceCallId,
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
