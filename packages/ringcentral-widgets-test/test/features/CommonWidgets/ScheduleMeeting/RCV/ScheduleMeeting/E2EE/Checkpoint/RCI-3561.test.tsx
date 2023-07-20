/**
 * RCI-3561: JBH still keep the status when open E2EE
 * https://test_it_domain/test-cases/RCI-3561
 * Preconditions:
 * RC CTI app is installed and enabled
 * The 'Use end-to-end encryption by default for new meetings' option is unlocked in SW Admin
 * The user has logged in to RC CTI with the RCV provider
 * Keep the 'Use personal meeting id' option off
 * Entry point(/s):
 * ToggleAdmin E2EEExecute in SWJBH Status in CTIonTurnoffandlocktheSW Admin security settings below:Participants can only join after the hostoffandlock
 *
  | ToggleAdmin E2EE |Execute in SW |JBH Status in CTI |
  | on |TurnoffandlocktheSW Admin security settings below:Participants can only join after the host |offandlock |

 * ToggleAdmin E2EE
 * TurnoffandlocktheSW Admin security settings below:
 * Participants can only join after the host
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn{Execute in SW}of theSW
 * >Office Add-in > New Event > RingCentralScheduler> Turn on the E2EE toggle in CTI
 * Note(/s):
 * Admin E2EE:TheRingCentral Video E2EE Availability flag in theAdmin web: Account Info > E2EE toggle
 * SW Admin E2EE:The'Use end-to-end encryption by default for new meetings' in the SW:Admin> Settings > RingCentral Vedio > Security
 * Other SW Admin security settings:SWAdmin portal> Meetings > Meetings Settings > Security
 * > Turn {ToggleAdmin E2EE} of theAdmin E2EE
 * >Turn{Execute in SW}of theSW
 * >Office Add-in > New Event > RingCentralScheduler> Turn on the E2EE toggle in CTI
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
  CheckboxIsLocked,
  CheckRCVPageDisplay,
  TurnOnToggle,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('JBH still keep the status when open E2EE')
export class RCI3561 extends Step {
  Login: StepProp = CommonLogin;
  @examples(`
    | mockE2EEState | ToggleAdminE2EE | ExecuteInSW                                                    | JBHStatusInCTI  |
    | 'off-unlock'  | 'on'            | 'off and lock Participants can only join after the host in SW' | 'off and lock ' |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="JBH still keep the status when open E2EE" action={Login}>
        <When
          desc="> Go to Entry point
								> Check the status of 'Participants can only join after the host' in CTI"
          action={[
            CheckRCVPageDisplay,
            <CheckboxIsChecked
              dataSign="allowJoinBeforeHost"
              isChecked={false}
            />,
            <CheckboxIsLocked dataSign="allowJoinBeforeHostWrapper" isLocked />,
            <TurnOnToggle dataSign="e2ee" />,
          ]}
        />
        <Then
          desc="The status is showing off and lock"
          action={[
            <CheckboxIsLocked isLocked dataSign="allowJoinBeforeHostWrapper" />,
            <CheckboxIsChecked
              isChecked={false}
              dataSign="allowJoinBeforeHost"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
