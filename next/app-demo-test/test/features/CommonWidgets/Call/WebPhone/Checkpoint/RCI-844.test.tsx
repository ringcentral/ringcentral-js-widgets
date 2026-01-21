import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';

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
  StepFunction,
  Then,
  When,
  autorun,
  common,
  it,
  p1,
  title,
} from '@ringcentral-integration/test-utils';

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

@autorun(test.skip)
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
          ((_, { app }) => {
            const webphone = app.container.got(Webphone)!;
            jest.spyOn(webphone, 'answer');
            jest.spyOn(webphone, '_onAccepted');
            jest.spyOn(webphone, '_holdOtherSession');
            jest.spyOn(webphone, 'unhold');
            jest.spyOn(webphone, 'hold');
          }) as StepFunction,
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
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              const connectedCall = webphone.sessions.find(
                (item) =>
                  item.direction === 'Inbound' &&
                  item.callStatus === 'webphone-session-connected',
              );
              SESSION_ID = connectedCall!.id;
            }) as StepFunction,
            <CheckAnswerBehavior
              answerCallFinder={(sessions) =>
                sessions.find(
                  (item: any) =>
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
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.hold).toHaveBeenCalledWith(SESSION_ID);
            }) as StepFunction,
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
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.unhold).toHaveBeenCalledWith(SESSION_ID);
            }) as StepFunction,
            <CheckCallCtrlButton callButtonBehaviorType="hold" />,
          ]}
        />
      </Scenario>
    );
  }
}
