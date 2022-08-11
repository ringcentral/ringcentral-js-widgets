/**
 * RCI-864: Second call incoming_Answer and End
 * https://test_id_domain/test-cases/RCI-864
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call, and make another incoming call
 * 2. Make a outbound call, and make another incoming call
 */

import {
  p1,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CallItemButtonBehavior,
  MakeInboundCall,
  AnswerCall,
  CheckActiveCallExist,
  CheckAnswerAndEndBehavior,
  MakeCall,
} from '../../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';

@autorun(test)
@it
@p1
@title('Second call incoming_Answer and End - ${direction}')
export class RCI864 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  firstCallId: string = '';
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
            (_, { phone }) => {
              jest.spyOn(phone.webphone, 'answer');
              jest.spyOn(phone.webphone, '_onAccepted');
              jest.spyOn(phone.webphone, 'hangup');
            },
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
            (_: any, { phone }: any) => {
              this.firstCallId =
                phone.callMonitor.activeCurrentCalls[0]?.sessionId;
            },
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
