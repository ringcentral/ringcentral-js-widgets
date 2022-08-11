/**
 * RCI-865: Second call incoming_Ignore
 * https://test_id_domain/test-cases/RCI-865
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
} from '@ringcentral-integration/test-utils';
import { StepFunction } from '../../../../../../../lib/step';
import {
  AnswerCall,
  CallButtonBehavior,
  CheckIgnoreButton,
  MakeCall,
  MakeInboundCall,
} from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';

@autorun(test.skip)
@it
@p1
@title('Second call incoming_Ignore')
export class RCI865 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  @examples(`
    | direction  |
    | 'Outbound' |
    | 'Inbound'  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Second call incoming_Ignore" action={Login}>
        <When
          desc="Check the active call page"
          action={({ direction }: any) => [
            (_: any, { phone }: any) => {
              jest.spyOn(phone.webphone, 'reject');
            },
            <MakeCall direction={direction} useUserAgentSession />,
            direction === 'Inbound' ? AnswerCall : () => {},
            <MakeInboundCall />,
            <TriggerActiveCallChanged />,
          ]}
        />
        <Then
          desc="There should be an ignore button
										[L10N]"
          action={CheckIgnoreButton}
        />
        <When
          desc="Click ignore button"
          action={<CallButtonBehavior callButtonBehaviorType="ignore" />}
        />
        <Then
          desc="User should stay on current call and the incoming call is ignored"
          action={async (_: any, { phone }: any) => {
            expect(phone.webphone.reject).toBeCalled();
          }}
        />
      </Scenario>
    );
  }
}
