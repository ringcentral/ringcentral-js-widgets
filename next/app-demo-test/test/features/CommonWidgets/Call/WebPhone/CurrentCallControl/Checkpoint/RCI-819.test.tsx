/**
 * RCI-819: Current call control_hangup
 * https://test_it_domain/test-cases/RCI-819
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call and keep in active call page
 * 2. Make an outbound calland keep in active call page
 */
import {
  And,
  autorun,
  common,
  examples,
  it,
  p0,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  CheckActiveCallExist,
  CheckActiveCallHidden,
  CheckButtonExist,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import { CheckRouterNavigation } from '../../../../../../steps/Navigate';

@autorun(test)
@common
@it
@p0
@title('Current call control_hangup')
export class RCI819 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;

  @examples(`
    | direction  | action                         | currentPage   | hangUpDataSign |
    | 'Inbound'  | 'Keep in the Active call page' | 'Active call' | 'hangup'       |
    | 'Outbound' | 'Click the Keypad button'      | 'Keypad'      | 'hangUp'       |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Current call control_hangup" action={Login}>
        <When
          desc="Make an {direction} call"
          action={({ direction }: any) => (
            <MakeCall
              direction={direction}
              useUserAgentSession
              status="connected"
            />
          )}
        />
        <And
          desc="And take {action}"
          action={async ({ direction }: any) => [
            direction === 'Inbound' ? (
              CheckActiveCallExist
            ) : (
              <CallButtonBehavior callButtonBehaviorType="keypad" />
            ),
          ]}
        />
        <Then
          desc="There is a 'Hangup' button"
          action={async ({ hangUpDataSign }: any) => (
            <CheckButtonExist callButtonBehaviorType={hangUpDataSign} />
          )}
        />
        <When
          desc="Press the 'Hangup' button on the {Current page}"
          action={async ({ hangUpDataSign }: any) => (
            <CallButtonBehavior callButtonBehaviorType={hangUpDataSign} />
          )}
        />
        <Then
          desc="The call is ended
                Note(/s): Due to the production bug RCINT-21592, the after hangup user will be navigated to the Dial page"
          action={[
            CheckActiveCallHidden,
            <CheckRouterNavigation toPage="Dialer" />,
          ]}
        />
      </Scenario>
    );
  }
}
