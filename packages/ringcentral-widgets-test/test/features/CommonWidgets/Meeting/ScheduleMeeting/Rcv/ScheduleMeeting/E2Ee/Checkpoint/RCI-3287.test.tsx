/**
 * RCI-3287: Check invitation should be empty when E2EE is on but API fail to return
 * https://test_it_domain/test-cases/RCI-3287
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turnonthe 'RingCentral Video E2EE Availability'flag on theAdmin web
 * The E2EE option ismarked on
 * The user has logged in to RC CTI with theRCVprovider
 * Entry point(/s):
 *
  | Brand |User name |Brand meeting name |App name |Meeting link |Meeting ID |Brand name |Create account |More link |
  | RC |Test account |RingCentral Video |RingCentral app |https://v.ringcentral.com/join/100652117?pw=202cb962ac59075b964b07152d234b70 |100652117 |RingCentral |https://www.ringcentral.com/signup.html |https://support.ringcentral.com/app/video/desktop-web/end-to-end-encryption-ringcentral-video.html |

 * Scheduler:ClickSchedulebutton > And the API failed to return the value ofinvitation Info
 * Outlook Appointment:ClickSchedulebutton > And the APIfailedto return the value ofinvitation Info
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../../../lib/step';
import { CheckAlertToBeCallWith } from '../../../../../../../../steps/Alert';
import { CommonLogin } from '../../../../../../../../steps/CommonLogin';
import {
  CheckRCVPageDisplay,
  ClickScheduleButton,
} from '../../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p1
@title(
  'Check invitation should be empty when E2EE is on but API fail to return',
)
export class RCI3287 extends Step {
  Login: StepProp = CommonLogin;
  CheckRcvE2eeInjection: StepFunction<any, any> = () => {};
  run() {
    const { Login, CheckRcvE2eeInjection } = this;
    return (
      <Scenario desc="Check invitation should be empty when E2EE is on but API fail to return">
        <Given desc="Go to entry point" action={Login} />
        <When
          desc="Wait rcv page display, click schedule button"
          action={[CheckRCVPageDisplay, ClickScheduleButton]}
        />
        <Then
          desc="The meeting should be scheduled successfully.
										The meeting title should be in the Title field
										The meeting link should be in the Location field
										The invitation should be empty
										[L10N]"
          action={CheckRcvE2eeInjection}
        />
        <And
          desc="The error message should show."
          action={
            <CheckAlertToBeCallWith
              level="danger"
              message="meetingStatus-renderInviteError"
            />
          }
        />
      </Scenario>
    );
  }
}
