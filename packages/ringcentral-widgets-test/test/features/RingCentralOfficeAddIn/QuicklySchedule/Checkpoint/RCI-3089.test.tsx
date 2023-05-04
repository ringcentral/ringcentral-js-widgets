/**
 * RCI-3089: Users event description should be kept when add meeting
 * https://test_id_domain/test-cases/RCI-3089
 * Preconditions:
 * <ol><li>RC CTI app is installed and enabled</li><li>User has logged in to 3rd party</li><li>User logged in to RC CTI app</li><li>User has an outlook event (Event1) with description</li></ol>
<p><strong><span style='color: rgb(102, 153, 102);'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p>
<p><span style='background-color: transparent;'>Outlook > Calendar > Edit the event1</span>> <span style='background-color: transparent;'>Click </span><span style='background-color: transparent;'>'RingCentral Scheduler' / 'Schedule with RingCentral'</span></p><p>Outlook > Calendar > <span style='background-color: transparent;'>Edit the event1></span><span style='background-color: transparent;'> </span><span style='background-color: transparent;'>Click 'New Appointment' or 'New Meeting' in the menu bar > Click {Brand name} for Outlook</span></p>
 */

import {
  p1,
  it,
  autorun,
  examples,
  And,
  Scenario,
  StepFunction,
  Step,
  Given,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import { CheckRCVPageDisplay } from '../../../../steps/Meeting';

@autorun(test.skip)
@it
@p1
@title("User's event description should be kept when add meeting")
export class RCI3089 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckEvent: StepFunction<any, any> = () => {};
  @examples(`
    | subject        | location                                               | body          |
    | 'Event1 title' | ' https://v.ringcentral.com/join/847615409' | 'Event1 body' |
  `)
  run() {
    const { Login, CheckEvent } = this;
    return (
      <Scenario desc="User's event description should be kept when add meeting.">
        <Given desc="User has an outlook event (Event1) with description" />
        <When desc="User enter Entry point" action={Login} />
        <Then
          desc="Open settings config at the same time "
          action={CheckRCVPageDisplay}
        />
        <Then
          desc="The event1 's meeting detail below still kept on the event page
                  Meeting title
                  Meeting link
                  Meeting invitation"
          action={CheckEvent}
        />
      </Scenario>
    );
  }
}
