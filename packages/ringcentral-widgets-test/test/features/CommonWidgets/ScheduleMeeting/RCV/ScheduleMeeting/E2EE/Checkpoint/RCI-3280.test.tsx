/**
 * RCI-3280: E2EE option should be editable
 * https://test_it_domain/test-cases/RCI-3280
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turnonthe 'RingCentral Video E2EE Availability'flag on theAdmin web
 * The 'Use end-to-end encryption by default for new meetings' option is unlocked in SW Admin
 * The user has logged in to RC CTI with the RCV provider
 * Keep the 'Use personal meeting id' optionoff
 * Entry point(/s):
 *
  | SW_Extension_Status |Option_Value |
  | On |On |
	| Off |Off |

 * > Set 'Use end-to-end encryption by default for new meetings' option as <SW_Extension_Status> in SW Extension
 * > Office Add-in > New Event > Schedule with RingCentral
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
  CheckboxIsChecked,
  CheckboxIsDisabled,
  CheckboxIsLocked,
  CheckE2eeTooltip,
  CheckRCVPageDisplay,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('E2EE option should be editable')
export class RCI3280 extends Step {
  Login: StepProp = CommonLogin;
  @examples(`
    | mockE2EEState | e2eeOptionValue |
    | 'off-unlock'  | false           |
    | 'on-unlock'   | true            |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="E2EE option should be editable">
        <When desc="Go toEntry point" action={Login} />
        <Then
          desc="RCV meeting page displays
										Option 'Use end-to-end encryption' at the first line in Security Section'
										Option 'Use end-to-end encryption' status is <Option_Value> andeditable"
          action={(props: any, { phone }: any) => [
            CheckRCVPageDisplay,
            <CheckboxIsChecked
              isChecked={props.e2eeOptionValue}
              dataSign="e2ee"
            />,
            <CheckboxIsDisabled isDisabled={false} dataSign="e2ee" />,
            <CheckboxIsLocked isLocked={false} dataSign="e2eeWrapper" />,
          ]}
        />
        <When desc="Hover the tooltip icon behind the 'Use end-to-end encryption'" />
        <Then
          desc="Display Tooltip Copy:End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available.
										[L10N]"
          action={CheckE2eeTooltip}
        />
      </Scenario>
    );
  }
}
