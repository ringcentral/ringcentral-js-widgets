/**
 * RCI-3393: E2EE option should be enabled
 * https://test_it_domain/test-cases/RCI-3393
 * Preconditions:
 * The user has logged in to RC CTI with the RCV provider
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * ToggleAdmin E2EEExecute in SWE2EE StatusonTurnonandlockall of theother SW Admin security settings below:Enable meeting passwordAllow only authenticated users to join meetingsWaiting RoomParticipants can only join after the hostononTurnoffandlocktheSW Admin security settings below:Participants can only join after the hoston
 *
  | ToggleAdmin E2EE |Execute in SW |E2EE Status |
  | on |Turnonandlockall of theother SW Admin security settings below:Enable meeting passwordAllow only authenticated users to join meetingsWaiting RoomParticipants can only join after the host |on |
	| on |TurnoffandlocktheSW Admin security settings below:Participants can only join after the host |on |

 * ToggleAdmin E2EE
 * Turnonandlockall of theother SW Admin security settings below:
 * Enable meeting password
 * Allow only authenticated users to join meetings
 * Waiting Room
 * Participants can only join after the host
 * TurnoffandlocktheSW Admin security settings below:
 * Participants can only join after the host
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn {E2EE Status} of theSW
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Note(/s):
 * Admin E2EE:TheRingCentral Video E2EE Availability flag in theAdmin web: Account Info > E2EE toggle
 * SW Admin E2EE:The'Use end-to-end encryption by default for new meetings' in the SW:Admin> Settings > RingCentral Vedio > Security
 * Other SW Admin security settings:SWAdmin portal> Meetings > Meetings Settings > Security
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn {E2EE Status} of theSW
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Entry point(/s):
 * Entry point(/s):
 * ToggleAdmin E2EEExecute in SWE2EE StatusonTurnonandlockall of theother SW Admin security settings below:Enable meeting passwordAllow only authenticated users to join meetingsWaiting RoomParticipants can only join after the hostononTurnoffandlocktheSW Admin security settings below:Participants can only join after the hoston
 *
  | ToggleAdmin E2EE |Execute in SW |E2EE Status |
  | on |Turnonandlockall of theother SW Admin security settings below:Enable meeting passwordAllow only authenticated users to join meetingsWaiting RoomParticipants can only join after the host |on |
	| on |TurnoffandlocktheSW Admin security settings below:Participants can only join after the host |on |

 * ToggleAdmin E2EE
 * Turnonandlockall of theother SW Admin security settings below:
 * Enable meeting password
 * Allow only authenticated users to join meetings
 * Waiting Room
 * Participants can only join after the host
 * TurnoffandlocktheSW Admin security settings below:
 * Participants can only join after the host
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn {E2EE Status} of theSW
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Note(/s):
 * Admin E2EE:TheRingCentral Video E2EE Availability flag in theAdmin web: Account Info > E2EE toggle
 * SW Admin E2EE:The'Use end-to-end encryption by default for new meetings' in the SW:Admin> Settings > RingCentral Vedio > Security
 * Other SW Admin security settings:SWAdmin portal> Meetings > Meetings Settings > Security
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn {E2EE Status} of theSW
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Note(/s):
 */

import {
  autorun,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../../lib/step';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import {
  CheckboxIsChecked,
  CheckboxIsDisabled,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('E2EE option should be enabled')
export class RCI3393 extends Step {
  Login: StepProp = CommonLogin;
  @examples(`
    | mockE2EEState | isJoinAfterMeOff | expectedE2eeValue |
    | 'on-unlock'   | false            | true              |
    | 'on-unlock'   | true             | true              |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="E2EE option should be enabled">
        <When desc="Go toEntry point" action={Login} />
        <Then
          desc="Option 'Use end-to-end encryption' is {E2EE Status} and enabled
										[L10N]"
          action={({ expectedE2eeValue }: any) => [
            CheckRCVPageDisplay,
            <CheckboxIsChecked isChecked={expectedE2eeValue} dataSign="e2ee" />,
            <CheckboxIsDisabled isDisabled={false} dataSign="e2ee" />,
            <CheckboxIsLocked isLocked={false} dataSign="e2eeWrapper" />,
          ]}
        />
      </Scenario>
    );
  }
}
