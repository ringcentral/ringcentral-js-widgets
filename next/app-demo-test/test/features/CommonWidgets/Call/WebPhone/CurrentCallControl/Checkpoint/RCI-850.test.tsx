/**
 * RCI-850: Multiple calls incoming_send to voicemail
 * https://test_it_domain/test-cases/RCI-850
 * Preconditions:
 * 2. User has logged into RC CTI App
 * Entry point(/s):
 * Make a call and keep in call control page
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  it,
  p1,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallItemButtonBehavior,
  CheckAllCallsListPage,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../steps/Mock';

@autorun(test.skip)
@common
@it
@p1
@title('Multiple calls incoming_send to voicemail')
export class RCI850 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
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
            ((_: any, { app, payload }) => {
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'toVoiceMail');
              payload.firstSessionId = webphone.sessions[0].id;
            }) as StepFunction,
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
            (async (_: any, { app, payload }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.toVoiceMail).toHaveBeenCalled();
              expect(webphone.toVoiceMail).toHaveBeenCalledWith(
                payload.firstSessionId,
              );
            }) as StepFunction,
            <CheckAllCallsListPage ringingCallsLength={1} />,
          ]}
        />
      </Scenario>
    );
  }
}
