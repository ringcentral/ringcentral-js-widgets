/**
 * RCI-821: Current call control_Keypad
 * https://test_it_domain/test-cases/RCI-821
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call and keep in active call page
 * 2. Make an outbound calland keep in active call page
 */
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  examples,
  StepFunction,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  MakeCall,
  CheckButtonExist,
  CallButtonBehavior,
  ClickBackButton,
  CheckActiveCallExist,
  CheckActiveCallDialPadExist,
  ClickDialNumberButton,
  CheckDialPadInput,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';

@autorun(test)
@it
@p1
@title('Current call control_Keypad')
export class RCI821 extends Step {
  Login: StepProp = CommonLoginEntry;

  @examples(`
    | direction  |
    | 'Inbound'  |
    | 'Outbound' |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Current call control_Keypad" action={Login}>
        <When
          desc="Check the active call page"
          action={({ direction }: any) => {
            return [
              <MakeCall
                status="connected"
                direction={direction}
                useUserAgentSession
              />,
              CheckActiveCallExist,
            ];
          }}
        />
        <Then
          desc="There is a 'Keypad' button
										[L10N]"
          action={<CheckButtonExist callButtonBehaviorType="keypad" />}
        />
        <When
          desc="Press 'Keypad' button"
          action={<CallButtonBehavior callButtonBehaviorType="keypad" />}
        />
        <Then
          desc="The keypad pops up covering the active call page with the hide keypad button and the end call button displayed
								User is able to enter codes as needed"
          action={[CheckActiveCallDialPadExist]}
        />
        <When
          desc="Hold the 0 button"
          action={async () => ClickDialNumberButton('+')}
        />
        <Then
          desc="+ is filled into the input field"
          action={<CheckDialPadInput content="+" />}
        />
        <When desc="Press '<' back button" action={ClickBackButton} />
        <Then
          desc="Move on to active call page"
          action={CheckActiveCallExist}
        />
      </Scenario>
    );
  }
}
