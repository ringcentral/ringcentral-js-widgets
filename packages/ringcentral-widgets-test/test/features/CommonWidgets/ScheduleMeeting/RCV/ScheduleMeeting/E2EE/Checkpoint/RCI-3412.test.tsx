/**
 * RCI-3412: Update button should be enabled when the security settings changed
 * https://test_it_domain/test-cases/RCI-3412
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turnonthe 'RingCentral Video E2EE Availability'flag on theAdmin web
 * The 'Use end-to-end encryption by default for new meetings' option is off andnotlocked in SW Admin
 * The user has logged in to RC CTI with the RCV provider
 * Entry point(/s):
 *
  | E2EE |Action |
  | Off |Change password |
	| On |Change password |
	| On |Change waiting room option |
	| On |Change authenticated users option |

 * > Office Add-in > Add meeting
 */
import {
  autorun,
  common,
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
  ChangeMeetingOptionToOtherValue,
  CheckRCVPageDisplay,
  CheckScheduleButton,
  SwitchToggleTo,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('Update button should be enabled when the security settings changed')
export class RCI3412 extends Step {
  Login: StepProp = CommonLogin;

  @examples(`
    | e2eeOptionValue | securityAction                      | securityOption        |
    | false           | 'Change password'                   | 'password'            |
    | true            | 'Change password'                   | 'password'            |
    | true            | 'Change waiting room option'        | 'waitingRoomMode'     |
    | true            | 'Change authenticated users option' | 'isOnlyCoworkersJoin' |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario
        desc="Update button should be enabled when the security settings changed"
        action={Login}
      >
        <When
          desc="> Turn E2EE checkbox ${e2eeOptionValue}
										> Do ${securityAction}"
          action={({ e2eeOptionValue, securityOption }: any) => [
            CheckRCVPageDisplay,
            <SwitchToggleTo dataSign="e2ee" status={e2eeOptionValue} />,
            <ChangeMeetingOptionToOtherValue meetingOption={securityOption} />,
          ]}
        />
        <Then
          desc="The Update button should be enabled"
          action={<CheckScheduleButton buttonText="Update" />}
        />
      </Scenario>
    );
  }
}
