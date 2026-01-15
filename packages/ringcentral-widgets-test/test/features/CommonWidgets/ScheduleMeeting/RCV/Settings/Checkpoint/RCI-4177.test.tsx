/**
 * RCI-4177: RCV-Support Meeting without Password
 * https://test_it_domain/test-cases/RCI-4177
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to RC CTI with RCV provider
 * Entry point(/s):
 * Commons app: Login > More > Schedule Video Meeting
 * CanvasLogin canvas > go to course > click RC meeting > click on the right side of 'Schedule meeting'
 * SfB: Login > Meeting
 * Office Add-in: Login
 */
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
import {
  CheckPostMeetingParams,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  TurnOffToggle,
  CheckboxIsChecked,
} from '../../../../../../steps/Meeting';
import { CheckPasswordInputNotExist } from '../../../../../../steps/Meeting/Check/CheckPasswordField';

@autorun(test.skip)
@common
@it
@p2
@title('RCV-Support Meeting without Password')
export class RCI4177 extends Step {
  Login: StepFunction<any, any>;

  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="RCV-Support Meeting without Password">
        <When
          desc="Mark Off the 'Require password' checkbox"
          action={[
            Login,
            CheckRCVPageDisplay,
            <TurnOffToggle dataSign="requirePassword" />,
          ]}
        />
        <Then
          desc="The status of Require password checkbox should be off
                There is no any input box nor hint text under the Require password checkbox"
          action={[
            <CheckboxIsChecked dataSign="requirePassword" isChecked={false} />,
            CheckPasswordInputNotExist,
          ]}
        />
        <When
          desc="> Add meeting > Check the meeting link and invitation"
          action={ClickScheduleButton}
        />
        <Then
          desc="There is no password in the meeting link nor the invitation"
          action={
            <CheckPostMeetingParams
              isMeetingSecret={false}
              meetingPassword=""
            />
          }
        />
      </Scenario>
    );
  }
}
