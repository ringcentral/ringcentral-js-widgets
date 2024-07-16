/**
 * RCI-4008: RCV - Schedule PMI meeting - check the meeting title
 * https://test_it_domain/test-cases/RCI-4008
 * Preconditions:
 * <ol><li style='user-select: auto;'> RC CTI app is installed and enabled</li><li style='user-select: auto;'>User has logged in to 3rd party</li><li style='user-select: auto;'>For office add-in :  Have no meeting invitation and meeting title in email page</li></ol><table class='table table-bordered'><tbody><tr><td><b>User Name</b></td><td><b>First name</b></td><td><b>Last name</b></td></tr><tr><td>Lexie.Lin</td><td>Lexie</td><td>Lin</td></tr></tbody></table><p style='user-select: auto;'><br></p>
<p style='user-select: auto;'><strong style='user-select: auto;'><span style='color: rgb(102, 153, 102); user-select: auto;'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p>

<ol><li style='user-select: auto;'>User log in to RC CTI app > schedule video meeting page >  Select 'Use Personal Meeting ID XXX-XXX-XXX<span data-sign='personalMeetingId' style='background-color: transparent;'>' > lnvite with XXX Calendar</span></li><li style='user-select: auto;'>Outlook > New Event > office add-in > User log in to RC CTI app  > meeting setting page > Select 'Use Personal Meeting ID XXX-XXX-XXX<span data-sign='personalMeetingId'>' > Update meeting </span></li></ol>
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  SwitchUsePersonalMeetingId,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  CheckMeetingTitle,
  CheckPatchMeetingParams,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('RCV - Schedule PMI meeting - check the meeting title')
export class RCI4008 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  @examples(`
    | userName    |
    | 'Jean.Wu'   |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="RCV - Schedule PMI meeting - check the meeting title">
        <When desc="Direct to the Entry point" action={Login} />
        <And
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="Option 'Use Personal Meeting ID xxx-xxx-xxxx' is off"
          action={
            <CheckboxIsChecked
              isChecked={false}
              dataSign="usePersonalMeetingId"
            />
          }
        />
        <When desc="Turn on PMI checkbox" action={SwitchUsePersonalMeetingId} />
        <And desc="Schedule Meeting" action={ClickScheduleButton} />
        <Then
          desc="Check the meeting title would show: {userName}'s video meeting"
          action={<CheckPatchMeetingParams name={`Jean.Wu's video meeting`} />}
        />
      </Scenario>
    );
  }
}
