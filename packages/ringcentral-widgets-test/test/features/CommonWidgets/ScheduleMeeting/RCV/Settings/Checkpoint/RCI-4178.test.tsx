/**
 * RCI-4178: Update meeting password
 * https://test_it_domain/test-cases/RCI-4178
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to RC CTI with RCV provider
 * Entry point(/s):
 * Commons app: Login > More > Schedule Video Meeting
 * CanvasLogin canvas > go to course > click RC meeting > click on the right side of 'Schedule meeting'
 * SfB: Login > Meeting
 * Office Add-in: Login
 */

import {
  CheckPostMeetingParams,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  TurnOnToggle,
  CheckPatchMeetingParams,
} from '../../../../../../steps/Meeting';
import type { StepFunction } from '../../../../../../lib/step';
import {
  common,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  p2,
} from '../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../steps/Login';
import { EnterPassword } from '../../../../../../steps/Meeting/Operate/OperatePasswordField';

@autorun(test.skip)
@common
@it
@p2
@title('Update meeting password')
export class RCI4178 extends Step {
  Login: StepFunction<any, any>;

  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="Update meeting password">
        <When
          desc="> Mark ON the 'Require password' checkbox
										> Schedule meeting
										>Check the meeting link and invitation"
          action={[
            Login,
            CheckRCVPageDisplay,
            <TurnOnToggle dataSign="requirePassword" />,
            <EnterPassword password="12345678" />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="There is a password(eg: 12345678) included in the meeting link and the invitation"
          action={
            <CheckPostMeetingParams
              isMeetingSecret
              meetingPassword="12345678"
            />
          }
        />
        <When
          desc="> Input '87654321' in the password input box
										> Update meeting> Check the meeting link and invitation"
          action={[<EnterPassword password="87654321" />, ClickScheduleButton]}
        />
        <Then
          desc="The password in meeting link and invitation should be changed to'87654321'"
          action={
            <CheckPatchMeetingParams
              isMeetingSecret
              meetingPassword="87654321"
            />
          }
        />
      </Scenario>
    );
  }
}
