/**
 * RCI-844: Multiple calls_resume current call
 * https://test_it_domain/test-cases/RCI-844
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import {
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  it,
  p1,
  title,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import {
  CallButtonBehavior,
  CallItemButtonBehavior,
  CheckActiveCallExist,
  CheckAllCallsListPage,
  CheckAnswerBehavior,
  CheckCallCtrlButton,
  MakeCall,
} from '../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../steps/CommonLogin';
import {
  CreateMock as CommonCreateMock,
  MockCallPresence,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test)
@it
@p1
@common
@title('Multiple calls_resume current call')
export class ResumeCurrentCall extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  run() {
    const { Login } = this;
    let SESSION_ID = '';
    return (
      <Scenario
        desc="Multiple calls_resume current call"
        action={[
          Login,
          (_, { phone }: Context) => {
            jest.spyOn(phone.webphone, 'answer');
            jest.spyOn(phone.webphone, '_onAccepted');
            jest.spyOn(phone.webphone, '_holdOtherSession');
            jest.spyOn(phone.webphone, 'unhold');
            jest.spyOn(phone.webphone, 'hold');
          },
          <MakeCall
            phoneNumber="15552556241"
            status="connected"
            direction="Inbound"
            useUserAgentSession
          />,
          <MakeCall phoneNumber="15552556242" useUserAgentSession />,
        ]}
      >
        <When
          desc="Make an inbound call,
										back to the all calls page,
										click on the green call button of a WebRTC call on ringing"
          action={[
            <MakeCall
              useUserAgentSession
              phoneNumber="15552556247"
              direction="Inbound"
            />,
            TriggerActiveCallChanged,
            <NavigateTo path="/calls" />,
            CheckAllCallsListPage,
            <CallItemButtonBehavior callButtonBehaviorType="accept" />,
            MockCallPresence,
            <TriggerActiveCallChanged />,
          ]}
        />
        <Then
          desc="User should be directed to that calls call control page
										The call should be accepted
										Hold the previous active call"
          action={[
            (_, { phone }: Context) => {
              const connectedCall = phone.webphone.sessions.find(
                (item) =>
                  item.direction === 'Inbound' &&
                  item.callStatus === 'webphone-session-connected',
              );
              SESSION_ID = connectedCall.id;
            },
            <CheckAnswerBehavior
              answerCallFinder={(sessions) =>
                sessions.find(
                  (item) =>
                    item.direction === 'Inbound' &&
                    item.callStatus === 'webphone-session-connected',
                )
              }
            />,
            CheckActiveCallExist,
          ]}
        />
        <When
          desc="Click on the hold button of the active call"
          action={<CallButtonBehavior callButtonBehaviorType="hold" />}
        />
        <Then
          desc="The call should be hold"
          action={[
            (_, { phone }: Context) => {
              expect(phone.webphone.hold).toHaveBeenCalledWith(SESSION_ID);
            },
            <CheckCallCtrlButton callButtonBehaviorType="onHold" />,
          ]}
        />
        <When
          desc="Click on the Unhold call button of a call"
          action={<CallButtonBehavior callButtonBehaviorType="onHold" />}
        />
        <Then
          desc="The call should be Unhold"
          action={[
            (_, { phone }: Context) => {
              expect(phone.webphone.unhold).toHaveBeenCalledWith(SESSION_ID);
            },
            <CheckCallCtrlButton callButtonBehaviorType="hold" />,
          ]}
        />
      </Scenario>
    );
  }
}
