/**
 * RCI-2378: RCV:Check the remove meeting button
 * https://test_it_domain/test-cases/RCI-2378
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RingCentral Scheduler App with RCV account
 * User has already scheduled a meeting :Event1
 * Entry point(/s):
 * Outlook > Calendar > Edit the event1>Click'RingCentral Scheduler' / 'Schedule with RingCentral'
 * Outlook > Calendar >Edit the event1>Click 'New Appointment' or 'New Meeting' in the menu bar > Click {Brand name} for Outlook
 */
import rcvMeetingSettingsBody from '@ringcentral-integration/commons/integration-test/mock/data/rcvMeetingSettings.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertToBeCallWith } from '../../../../../steps/Alert';
import { Login as CommonLogin } from '../../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  CheckRemoveButton,
  CheckScheduleButton,
  ClickRemoveButton,
} from '../../../../../steps/Meeting';
import {
  CheckRemoveMeetingModal,
  ClickConfirmInModal,
} from '../../../../../steps/Modal';

@autorun(test.skip)
@it
@p2
@title('RCV:Check the remove meeting button')
export class RCI2378 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckInvitationIsEmpty: StepFunction<any, any> = () => {};
  @examples([
    {
      meetingId: rcvMeetingSettingsBody.shortId,
    },
  ])
  run() {
    const { Login, CheckInvitationIsEmpty } = this;
    return (
      <Scenario desc="RCV:Check the remove meeting button">
        <When desc="Go to the Entry" action={Login} />
        <Then
          desc="Show meeting settings page with: Remove button, Update button"
          action={[
            CheckRCVPageDisplay,
            CheckRemoveButton,
            <CheckScheduleButton isDisabled buttonText="Update" />,
          ]}
        />
        <When desc="User click the Remove button" action={ClickRemoveButton} />
        <Then
          desc="Should show popup confirmation message:
										Title: Remove meeting?
										Content: Would you like to remove the meeting?
										Cancel button
										Remove button(default select)
										[L10N][Update OfficeAdd-in_21.1.1]"
          action={CheckRemoveMeetingModal}
        />
        <When
          desc="User click the Remove button"
          action={ClickConfirmInModal}
        />
        <Then
          desc="'Meeting removed.' alert is shown in the app
										Meeting invitation and meeting location shall be removed from the email
										Meeting Title did not remove the email
										User entered content shall be retained in the email.
										The meeting settings page will only show Add meeting button
										[L10N][Update OfficeAdd-in_21.1.1]"
          action={[
            <CheckAlertToBeCallWith
              level="success"
              message="removeSuccess"
              allowDuplicates={false}
            />,
            CheckInvitationIsEmpty,
          ]}
        />
      </Scenario>
    );
  }
}
