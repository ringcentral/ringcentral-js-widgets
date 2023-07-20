/**
 * RCI-850: Multiple calls incoming_send to voicemail
 * https://test_it_domain/test-cases/RCI-850
 * Preconditions:
 * 2. User has logged into RC CTI App
 * Entry point(/s):
 * Make a call and keep in call control page
 */

import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import {
  CallItemButtonBehavior,
  CheckAllCallsListPage,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../steps/Mock';

@autorun(test.skip)
@it
@p1
@title('Multiple calls incoming_send to voicemail')
export class RCI850 extends Step {
  Login: StepProp = CommonLogin;
  run() {
    return (
      <Scenario
        desc="Multiple calls incoming_send to voicemail"
        action={this.Login}
      >
        <When
          desc="Make more than two calls incoming simultaneously"
          action={[
            <MakeCall direction="Inbound" />,
            <MakeCall direction="Inbound" />,
            TriggerActiveCallChanged,
            (_: any, { phone, payload }) => {
              jest.spyOn(phone.webphone, 'toVoiceMail');
              payload.firstSessionId = phone.webphone.sessions[0].id;
            },
          ]}
        />
        <Then
          desc="User directs to all calls list page"
          action={<CheckAllCallsListPage ringingCallsLength={2} />}
        />
        <When
          desc="Click to voicemail button(one of new calls)"
          action={[
            <CallItemButtonBehavior callButtonBehaviorType="toVoiceMail" />,
            <TriggerActiveCallChanged
              handlerSessions={(sessions) => {
                return sessions.filter((session) => !session.isToVoicemail);
              }}
            />,
          ]}
        />
        <Then
          desc="Send to voicemail successful
                The call should be removed from all calls list
								The status of the rest calls should be remained"
          action={[
            async (_: any, { phone, payload }) => {
              expect(phone.webphone.toVoiceMail).toBeCalled();
              expect(phone.webphone.toVoiceMail).toBeCalledWith(
                payload.firstSessionId,
              );
            },
            <CheckAllCallsListPage ringingCallsLength={1} />,
          ]}
        />
      </Scenario>
    );
  }
}
