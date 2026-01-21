/**
 * RCI-864: Second call incoming_Answer and End
 * https://test_it_domain/test-cases/RCI-864
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call, and make another incoming call
 * 2. Make a outbound call, and make another incoming call
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
  examples,
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
  CheckActiveCallExist,
  CheckAnswerAndEndBehavior,
  MakeCall,
  MakeInboundCall,
} from '../../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';

@autorun(test.skip)
@common
@it
@p1
@title('Second call incoming_Answer and End - ${direction}')
export class RCI864 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  firstCallId = '';
  @examples(`
    | phoneNumber1   | phoneNumber2   | direction  |
    | '+18882556247' | '+15552556247' | 'Inbound'  |
    | '+18882556247' | '+15552556247' | 'Outbound'  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Second call incoming_Answer and End">
        <When
          desc="Direct to entry point"
          action={async ({ phoneNumber1, direction }: any) => [
            Login,
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'answer');
              jest.spyOn(webphone, '_onAccepted');
              jest.spyOn(webphone, 'hangup');
            }) as StepFunction,
            <MakeCall
              useUserAgentSession
              direction={direction}
              phoneNumber={phoneNumber1}
            />,
            direction === 'Inbound' ? AnswerCall : () => {},
          ]}
        />
        <And
          desc="Make another incoming call"
          action={async ({ phoneNumber2 }: any) => [
            <MakeInboundCall phoneNumber={phoneNumber2} useUserAgentSession />,
            TriggerActiveCallChanged,
          ]}
        />
        <When
          desc="get current active call session id"
          action={[
            ((_, { app }) => {
              const callMonitor = app.container.got(CallMonitor)!;
              this.firstCallId = callMonitor.activeCurrentCalls[0]?.sessionId;
            }) as StepFunction,
          ]}
        />
        <Then
          desc="There should be an Answer&End button and click it"
          action={
            <CallItemButtonBehavior callButtonBehaviorType="answerAndEnd" />
          }
        />
        <Then
          desc="The new call will be answered
								The current call will be ended"
          action={[
            CheckActiveCallExist,
            ({ phoneNumber2 }: any) => [
              <CheckAnswerAndEndBehavior
                hungUpCallId={this.firstCallId}
                answerCallNumber={phoneNumber2}
              />,
            ],
          ]}
        />
      </Scenario>
    );
  }
}
