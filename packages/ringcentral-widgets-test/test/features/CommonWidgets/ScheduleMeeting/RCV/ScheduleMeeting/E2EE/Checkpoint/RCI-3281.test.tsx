/**
 * RCI-3281: Update PMI meeting - E2EE is on and locked
 * https://test_it_domain/test-cases/RCI-3281
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turn on the 'RingCentral Video E2EE Availability'flag on theAdmin web
 * Schedule a PMI meeting on 3rd party
 * The 'Use end-to-end encryption by default for new meetings' option is marked on andlocked in SW Admin
 * The user has logged in to RC CTI with the RCV provider
 * Entry point(/s):
 * Office Add-in > Edit Calendar Event with PMI meeting > Schedule with RingCentral
 */
import {
  autorun,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckboxIsDisabled,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
  CheckScheduleButton,
  TurnOffToggle,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Update PMI meeting - E2EE is on and locked')
export class RCI3281 extends Step {
  Login: StepProp = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Update PMI meeting - E2EE is on and locked">
        <When desc="Go to Entry point" action={Login} />
        <Then
          desc="RCV meeting page displays
                PMI checkbox is on
                Option 'Use end-to-end encryption' should be disabled,off and locked"
          action={[
            CheckRCVPageDisplay,
            <CheckboxIsChecked isChecked dataSign="usePersonalMeetingId" />,
            <CheckboxIsChecked isChecked={false} dataSign="e2ee" />,
            <CheckboxIsDisabled isDisabled dataSign="e2ee" />,
            <CheckboxIsLocked isLocked dataSign="e2eeWrapper" />,
          ]}
        />
        <When
          desc="Turn off PMI checkbox"
          action={<TurnOffToggle dataSign="usePersonalMeetingId" />}
        />
        <Then
          desc="PMI checkbox should be off and disabled
                'Use end-to-end encryption' should be on,disabled and locked
                The Update button should change to the Schedule button"
          action={[
            <CheckboxIsChecked
              isChecked={false}
              dataSign="usePersonalMeetingId"
            />,
            <CheckboxIsDisabled isDisabled dataSign="usePersonalMeetingId" />,
            <CheckboxIsChecked isChecked dataSign="e2ee" />,
            <CheckboxIsDisabled isDisabled dataSign="e2ee" />,
            <CheckboxIsLocked isLocked dataSign="e2eeWrapper" />,
            <CheckScheduleButton buttonText="Add meeting" />,
          ]}
        />
      </Scenario>
    );
  }
}
