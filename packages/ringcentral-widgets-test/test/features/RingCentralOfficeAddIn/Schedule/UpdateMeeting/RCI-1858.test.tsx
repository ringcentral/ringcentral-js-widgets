/**
 * RCI-1858: RCM - Update meeting - meeting deleted
 * https://test_id_domain/test-cases/RCI-1858
 * Preconditions:
 * Already installed and logged in RingCentral Office Add-In
 * Entry point(/s):
 * Outlook Web Client
 * Windows Outlook
 * Mac Outlook
 */

import {
  And,
  autorun,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../../lib/step';
import { CheckAlertToBeCallWith } from '../../../../steps/Alert';
import { CommonLogin } from '../../../../steps/CommonLogin';
import {
  CheckRCMPageDisplay,
  CheckScheduleButton,
  ClickRCMScheduleButton,
  SwitchToggle,
} from '../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('RCM - Update meeting - update meeting which has been deleted')
export class RCI1858_updateMeetingHasBeenDeleted extends Step {
  Login: StepProp = CommonLogin;
  CheckInjection: StepFunction<any, any> = () => {};
  run() {
    const { Login, CheckInjection } = this;
    return (
      <Scenario
        desc="RCM - Update meeting - update meeting which has been deleted"
        action={Login}
      >
        <When
          desc="Login RC Schedule a meeting, do not close event page"
          action={CheckRCMPageDisplay}
        />
        <Then
          desc="Schedule this meeting successfully"
          action={CheckInjection}
        />
        <When
          desc="Go to SW > My Extension > More> Meetings > My Meetings > Upcoming Meeting > delete the meeting, back to add-in, click 'Update Meeting' button"
          action={[
            <SwitchToggle dataSign="requirePassword" />,
            ClickRCMScheduleButton,
          ]}
        />
        <Then
          desc="'Meeting has been deleted' is shown [L10N]"
          action={
            <CheckAlertToBeCallWith
              level="danger"
              message="meetingStatus-meetingIsDeleted"
            />
          }
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('RCM - Update meeting - get meeting which has been deleted')
export class RCI1858_getMeetingHasBeenDeleted extends Step {
  Login: StepProp = CommonLogin;
  CheckInjection: StepFunction<any, any> = () => {};
  run() {
    const { Login, CheckInjection } = this;
    return (
      <Scenario desc="RCM - Update meeting - get meeting which has been deleted">
        <When
          desc="Login RC Schedule a meeting, do not close event page"
          action={Login}
        />
        <And desc="Reopen the add-in" action={CheckRCMPageDisplay} />
        <Then
          desc="'Meeting has been deleted' is shown
										'Add meeting' button is shown on the bottom of the app"
          action={[
            <CheckAlertToBeCallWith
              level="danger"
              message="meetingStatus-meetingIsDeleted"
            />,
            <CheckScheduleButton isRCM buttonText="Add meeting" />,
          ]}
        />
        <When desc="Click Add meeting button" action={ClickRCMScheduleButton} />
        <Then
          desc="A new meeting is added to replace the deleted meeting"
          action={CheckInjection}
        />
      </Scenario>
    );
  }
}
