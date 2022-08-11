/**
 * RCI-2367: Update meeting -  Mark ON RCV PMI
 * https://test_id_domain/test-cases/RCI-2367
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3.User has rcv meeting permission
 * Entry point(/s):
 * Login to Outlook: Calendar -> New Event > RingCentral Scheduler App
 */

import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { Login as CommonLogin } from '../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckPasswordInputNotExist,
  CheckPasswordValue,
  CheckPMIFormat,
  CheckRcvMeetingSettingsValues,
  CheckRCVPageDisplay,
  CheckRemoveButton,
  CheckScheduleButton,
  ClickRemoveButton,
  TurnOnToggle,
} from '../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Update meeting -  Mark ON RCV PMI')
export class RCI2367 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Update meeting -  Mark ON RCV PMI">
        <When
          desc="User has log in and Mark ON 'Use personal Meeting ID xxx-xxx-xxxx '"
          action={[
            Login,
            CheckRCVPageDisplay,
            CheckPMIFormat,
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
          ]}
        />
        <Then
          desc="Show PMImeeting settings page"
          action={() => (
            <CheckRcvMeetingSettingsValues
              meeting={this.context.phone.rcVideo.personalVideo}
            />
          )}
        />
        <Then
          desc="Show 'Update' button[L10N]"
          action={
            <CheckScheduleButton buttonText="Update" isDisabled={false} />
          }
        />
      </Scenario>
    );
  }
}
