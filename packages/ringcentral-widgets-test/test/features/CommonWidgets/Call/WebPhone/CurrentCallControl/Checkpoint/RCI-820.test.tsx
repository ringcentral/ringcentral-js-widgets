/**
 * RCI-820: Current call control_mute/unmute
 * https://test_id_domain/test-cases/RCI-820
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Answer an inbound call and keep in active call page
 * 2. Make an outbound calland keep in active call page
 */

import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  examples,
  StepProp,
} from '@ringcentral-integration/test-utils';
import {
  MakeCall,
  CheckMuteButton,
  CheckUnmuteButton,
  CallButtonBehavior,
  AnswerCall,
} from '../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';

@autorun(test)
@it
@p1
@title('Current call control_mute/unmute - ${direction}')
export class RCI820 extends Step {
  Login: StepProp = CommonLoginEntry;

  @examples(`
    | direction  |
    | 'Outbound' |
    | 'Inbound'  |
    `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Current call control_mute/unmute" action={Login}>
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
          desc="There is a 'Mute' button
										[L10N]"
          action={CheckMuteButton}
        />
        <When
          desc="Press 'Mute' button"
          action={<CallButtonBehavior callButtonBehaviorType="unmute" />}
        />
        <Then
          desc="Call is muted, the other party cannot hear any sounds
										Mute button is replaced by 'Unmuted' button
										[L10N]"
          action={CheckUnmuteButton}
        />
        <When
          desc="Press 'Unmuted' button"
          action={<CallButtonBehavior callButtonBehaviorType="mute" />}
        />
        <Then
          desc="Call is resumed and unmuted
										The Unmuted button is replaced with mute button"
          action={CheckMuteButton}
        />
      </Scenario>
    );
  }
}
