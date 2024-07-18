/**
 * RCI-3724: RCM: Schedule meeting by clicking the schedule button
 * https://test_it_domain/test-cases/RCI-3724
 * Preconditions:
 * RC CTI app is installed and enabled
 * User had log in toapp with anRCM account
 * Entry point(/s):
 * > Outlook > Calendar > Click 'New Appointment'/'New Meeting' in the menu bar > Go to meeting invitation page
 */
import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepProp,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { CreateMock } from '../../../../steps/Mock';

// not enable in common
@autorun(test.skip)
@it
@p1
@title('RCM: Schedule meeting by clicking the schedule button')
export class ScheduleRCMMeeting extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  TriggerScheduleWithBtn: StepProp = () => ({});
  CheckRCMInvitation: StepProp = () => ({});
  run() {
    const { CreateMock, Login, TriggerScheduleWithBtn, CheckRCMInvitation } =
      this;
    return (
      <Scenario desc="RCM: Schedule meeting by clicking the schedule button">
        <When
          desc="> Go to entry point
								> Click the Schedule with RingCentral button"
          action={[
            CreateMock,
            Login,
            WaitForRenderReady,
            TriggerScheduleWithBtn,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="Comment: need change to RCM invitation
                There are :
                1. Show a few second dialog Loading...
                2. Inject meeting link to Location and meeting invitation to email body
                Meeting link template:
                Test env:
                https://xmnup-rxe-1-v.lab.nordigy.ru/join/155215167
                Prod env:
                https://v.ringcentral.com/join/xxxxxxxxx;
                Meeting invitation template
                Yami zhang has invited you to a RingCentral Video meeting.Please join using this link:   https://xmnup-rxe-1-v.lab.nordigy.ru/join/155215167
                One tap to join audio only from a smartphone:   +13232382296,,155215167# United States (San Mateo, CA)
                Or dial:   +13232382296 United States (San Mateo, CA)
                Access Code / Meeting ID: 155 215 167
                International numbers available: https://v.ringcentral.com/teleconference/"
          // 'Loading...' dialog was written by C#, could not covered by IT
          action={CheckRCMInvitation}
        />
      </Scenario>
    );
  }
}
