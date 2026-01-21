/**
 * RCI-849: Multiple calls incoming_End current call
 * https://test_it_domain/test-cases/RCI-849
 * Preconditions:
 * 2. User has logged into RC CTI App
 * Entry point(/s):
 * Make a call and keep in call control page
 */
import {
  CallMonitor,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  common,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  AnswerCall,
  CallItemButtonBehavior,
  CheckAllCallsListPage,
  CheckIncomingCallPageExist,
  MakeInboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock as CommonCreateMock,
  MockActiveCall,
  MockMessageSync,
  MockPresence,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';

@autorun(test.skip)
@common
@it
@p1
@title('Multiple calls incoming_End current call')
export class RCI849 extends Step {
  Login: StepFunction<any, any> = () => CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  currentCallId = '';
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Multiple calls incoming_End current call"
        action={[
          CreateMock,
          <MockActiveCall repeat={0} />,
          <MockMessageSync repeat={0} />,
          <MockPresence repeat={0} />,
          Login,
          ((_, { app }) => {
            const webphone = app.container.got(Webphone)!;
            jest.spyOn(webphone, 'hangup');
          }) as StepFunction,
        ]}
      >
        <Given
          desc="Make a call and keep in call control page"
          action={[
            <MakeInboundCall useUserAgentSession phoneNumber="+15552556247" />,
            CheckIncomingCallPageExist,
            AnswerCall,
            TriggerActiveCallChanged,
          ]}
        />
        <When
          desc="Make more than two calls incoming simultaneously"
          action={[
            <MakeInboundCall useUserAgentSession phoneNumber="+18882556247" />,
            TriggerActiveCallChanged,
            <MakeInboundCall useUserAgentSession phoneNumber="+18882556248" />,
            TriggerActiveCallChanged,
          ]}
        />
        <Then
          desc="User directs to all calls list page"
          action={[<CheckAllCallsListPage length={3} />]}
        />
        <When
          desc="get current call session id"
          action={[
            ((_, { app }) => {
              const callMonitor = app.container.got(CallMonitor)!;
              this.currentCallId = callMonitor.activeCurrentCalls[0]?.sessionId;
            }) as StepFunction,
          ]}
        />
        <And
          desc="Click on end button of current call"
          action={[<CallItemButtonBehavior callButtonBehaviorType="hangup" />]}
        />
        <Then
          desc="Current call will be ended
								The status of the rest calls should be remained"
          action={[
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              // The current call is ended
              expect(webphone.hangup).toHaveBeenCalledWith(this.currentCallId);
            }) as StepFunction,
            <CheckAllCallsListPage length={2} />,
          ]}
        />
      </Scenario>
    );
  }
}
