/**
 * RCI-3527: Cancel move meeting
 * https://test_it_domain/test-cases/RCI-3527
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RingCentral Scheduler App withRCVaccount
 * User has already scheduled a meeting :Event1
 * Entry point(/s):
 * Outlook > Calendar > Edit the event1>Click'RingCentral Scheduler' / 'Schedule with RingCentral'
 * Outlook > Calendar >Edit the event1>Click 'New Appointment' or 'New Meeting' in the menu bar > Click {Brand name} for Outlook
 */

import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  CheckRemoveButton,
  CheckScheduleButton,
  ClickRemoveButton,
  ClickCancelOnPopup,
} from '../../../../../steps/Meeting';
import { CheckModalExist } from '../../../../../steps/Modal';

@autorun(test.skip)
@it
@p2
@title('Cancel move meeting')
export class RCI3527 extends Step {
  Login: StepFunction<any, any> = CommonLogin;

  run() {
    const { Login } = this;
    return (
      <Scenario desc="Cancel move meeting" action={Login}>
        <When
          desc="> User click the Remove button
										> Click the Cancel in the popup"
          action={[
            CheckRCVPageDisplay,
            CheckRemoveButton,
            <CheckScheduleButton isDisabled buttonText="Update" />,
            ClickRemoveButton,
            CheckModalExist,
            ClickCancelOnPopup,
          ]}
        />
        <Then
          desc="The popup will be closed directly."
          action={<CheckModalExist isExist={false} />}
        />
      </Scenario>
    );
  }
}
