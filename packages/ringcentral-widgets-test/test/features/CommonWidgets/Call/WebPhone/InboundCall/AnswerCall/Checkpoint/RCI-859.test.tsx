/**
 * RCI-859: Second Incoming Call_Answer and Hold
 * https://test_id_domain/test-cases/RCI-859
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
  CheckAnswerAndHoldBehavior,
  CheckAllCallsListPage,
  MakeInboundCall,
  AnswerCall,
  CheckActiveCallExist,
  ClickBackButton,
  MakeCall,
} from '../../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../../steps/CommonLogin';

import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';

@autorun(test)
@it
@p1
@title('Second Incoming Call_Answer and Hold - ${direction}')
export class RCI859 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  @examples(`
    | phoneNumber1   | phoneNumber2   | direction  |
    | '+16505819954' | '+15552556247' | 'Inbound'  |
    | '+16505819954' | '+15552556247' | 'Outbound'  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Second Incoming Call_Answer and Hold">
        <When
          desc="Direct to entry point"
          action={async ({ phoneNumber1, direction }: any) => [
            Login,
            (_, { phone }) => {
              jest.spyOn(phone.webphone, 'answer');
              jest.spyOn(phone.webphone, '_onAccepted');
              jest.spyOn(phone.webphone, 'hold');
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
        <Then
          desc="Check there should be an Answer & Hold button and click it"
          action={
            <CallItemButtonBehavior callButtonBehaviorType="answerAndHold" />
          }
        />
        <And
          desc="1. The second call should be answered
										2. User should be navigated to call control page
										3. The first call should be held"
          action={[
            CheckActiveCallExist,
            ({ phoneNumber1, phoneNumber2 }: any) => [
              <CheckAnswerAndHoldBehavior
                firstCallPNumber={phoneNumber1}
                secondCallPNumber={phoneNumber2}
              />,
            ],
          ]}
        />
        <When desc="Click 'All Calls' back button" action={ClickBackButton} />
        <Then
          desc="Check that there is an current call and a onhold call."
          action={
            <CheckAllCallsListPage
              length={2}
              currentCallsLength={1}
              onHoldCallsLength={1}
            />
          }
        />
      </Scenario>
    );
  }
}
