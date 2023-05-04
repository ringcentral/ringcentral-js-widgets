/**
 * RCI-3284: E2EE option should be disabled
 * https://test_id_domain/test-cases/RCI-3284
 * Preconditions:
 * The user has logged in to RC CTI with the RCV provider
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * ToggleAdmin E2EEExecute in SWE2EE Statusoff-offonTurn off theSW Admin E2EEand lockoffonTurn on theSW Admin E2EEandlockononTurn off and lock one of theother SW Admin security settings:Enable meeting passwordAllow only authenticated users to join meetingsWaiting Roomoff
 *
  | ToggleAdmin E2EE |Execute in SW |E2EE Status |
  | off |- |off |
	| on |Turn off theSW Admin E2EEand lock |off |
	| on |Turn on theSW Admin E2EEandlock |on |
	| on |Turn off and lock one of theother SW Admin security settings:Enable meeting passwordAllow only authenticated users to join meetingsWaiting Room |off |

 * ToggleAdmin E2EE
 * Turn off and lock one of theother SW Admin security settings:
 * Enable meeting password
 * Allow only authenticated users to join meetings
 * Waiting Room
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Note(/s):
 * Admin E2EE:TheRingCentral Video E2EE Availability flag in theAdmin web: Account Info > E2EE toggle
 * SW Admin E2EE:The'Use end-to-end encryption by default for new meetings' in the SW:Admin> Settings > RingCentral Vedio > Security
 * Other SW Admin security settings: SWAdmin portal> Meetings > Meetings Settings > Security
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Entry point(/s):
 * Entry point(/s):
 * ToggleAdmin E2EEExecute in SWE2EE Statusoff-offonTurn off theSW Admin E2EEand lockoffonTurn on theSW Admin E2EEandlockononTurn off and lock one of theother SW Admin security settings:Enable meeting passwordAllow only authenticated users to join meetingsWaiting Roomoff
 *
  | ToggleAdmin E2EE |Execute in SW |E2EE Status |
  | off |- |off |
	| on |Turn off theSW Admin E2EEand lock |off |
	| on |Turn on theSW Admin E2EEandlock |on |
	| on |Turn off and lock one of theother SW Admin security settings:Enable meeting passwordAllow only authenticated users to join meetingsWaiting Room |off |

 * ToggleAdmin E2EE
 * Turn off and lock one of theother SW Admin security settings:
 * Enable meeting password
 * Allow only authenticated users to join meetings
 * Waiting Room
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * > {Execute in SW}
 * >Office Add-in > New Event > Schedule with RingCentral
 * Note(/s):
 * Admin E2EE:TheRingCentral Video E2EE Availability flag in theAdmin web: Account Info > E2EE toggle
 * SW Admin E2EE:The'Use end-to-end encryption by default for new meetings' in the SW:Admin> Settings > RingCentral Vedio > Security
 * Other SW Admin security settings: SWAdmin portal> Meetings > Meetings Settings > Security
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
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

import { StepProp } from '../../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckboxIsDisabled,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title(
  'E2EE option should be disabled when e2ee is ${mockE2EEState} and ${mockSecurityOption}',
)
export class RCI3284 extends Step {
  Login: StepProp = CommonLogin;

  @examples(`
    | mockE2EEState                  | mockSecurityOption   | expectE2eeValue | expectE2eeIsLocked | Note                                              |
    | 'off-in-admin-web'             | 'N/A'                | false           | false              | 'N/A'                                             |
    | 'on-lock'                      | 'N/A'                | true            | true               | 'N/A'                                             |
    | 'off-lock'                     | 'N/A'                | false           | true               | 'N/A'                                             |
    | 'be-off-due-to-related-option' | 'password_scheduled' | false           | false              | 'Enable meeting password'                         |
    | 'be-off-due-to-related-option' | 'guest_join'         | false           | false              | 'Allow only authenticated users to join meetings' |
    | 'be-off-due-to-related-option' | 'waiting_room'       | false           | false              | 'Waiting Room'                                    |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="E2EE option should be disabled when ${mockE2EEState}">
        <When desc="Go toEntry point" action={Login} />
        <Then
          desc="1. RCV meeting page displays
										2. Option 'Use end-to-end encryption' at the first line in Security Section'
										3.Option 'Use end-to-end encryption' is {E2EE Status} and disabled"
          action={({ expectE2eeIsLocked, expectE2eeValue }: any) => [
            CheckRCVPageDisplay,
            <CheckboxIsChecked isChecked={expectE2eeValue} dataSign="e2ee" />,
            <CheckboxIsDisabled isDisabled dataSign="e2ee" />,
            <CheckboxIsLocked
              isLocked={expectE2eeIsLocked}
              dataSign="e2eeWrapper"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
