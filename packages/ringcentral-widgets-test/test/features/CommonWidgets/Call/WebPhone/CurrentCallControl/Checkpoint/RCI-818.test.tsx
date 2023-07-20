/**
 * RCI-818: Current call control_hold/unhold
 * https://test_it_domain/test-cases/RCI-818
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
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import {
  MakeCall,
  CallButtonBehavior,
  CheckCallCtrlButton,
  CheckCallCtrlButtonEnable,
  ClickCallActionsButton,
  AnswerCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';

@autorun(test)
@it
@p1
@title('Current call control_hold/unhold - ${direction}')
export class RCI818 extends Step {
  Login: StepProp = CommonLoginEntry;

  @examples(`
    | direction  |
    | 'Outbound'  |
    | 'Inbound'  |
    `)
  run() {
    const { Login } = this;
    return (
      <Scenario
        desc="Current ${direction} call control_hold/unhold"
        action={Login}
      >
        <When
          desc="Check the active call page"
          action={({ direction }: any) => {
            return [
              <MakeCall direction={direction} useUserAgentSession />,
              direction === 'Inbound' ? AnswerCall : () => {},
            ];
          }}
        />
        <Then
          desc="There is a 'Hold' button
										[L10N]"
          action={<CheckCallCtrlButton callButtonBehaviorType="hold" />}
        />
        <When
          desc="Press 'Hold' button"
          action={<CallButtonBehavior callButtonBehaviorType="hold" />}
        />
        <Then
          desc="The call is on-hold and the other party should hear the hold tone set in Service Web
										Hold button is replaced by 'on hold' button
										Record/Flip buttons are grey out and disabled
										[L10N]"
          action={[
            <CheckCallCtrlButton callButtonBehaviorType="onHold" />,
            <CheckCallCtrlButtonEnable
              callButtonBehaviorType="record"
              isDisabled
            />,
            <ClickCallActionsButton />,
            <CheckCallCtrlButtonEnable
              callButtonBehaviorType="flip"
              isDisabled
            />,
            <ClickCallActionsButton />,
          ]}
        />
        <When
          desc="Press 'on hold' button"
          action={<CallButtonBehavior callButtonBehaviorType="onHold" />}
        />
        <Then
          desc="Call is resumed
										The on hold button is replaced with hold button
										Record/Flip buttons are back to enabled state"
          action={[
            <CheckCallCtrlButton callButtonBehaviorType="hold" />,
            <CheckCallCtrlButtonEnable callButtonBehaviorType="record" />,
            <ClickCallActionsButton />,
            <CheckCallCtrlButtonEnable callButtonBehaviorType="flip" />,
            <ClickCallActionsButton />,
          ]}
        />
      </Scenario>
    );
  }
}
