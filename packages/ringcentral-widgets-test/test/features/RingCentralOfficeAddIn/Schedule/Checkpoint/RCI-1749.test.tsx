/**
 * RCI-1749: Schedule a meeting with custom or default Subject
 * https://test_it_domain/test-cases/RCI-1749
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins
 * Login RCV account
 * Entry point(/s):
 * Outlook > Calendar > New Event >Click 'RingCentral Scheduler'
 * Outlook > Calendar > Click 'New Appointment' or 'New Meeting' in the menu bar
 */
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  And,
  Scenario,
  Step,
  Given,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  CheckPostMeetingParams,
  ClickScheduleButton,
} from '../../../../steps/Meeting';
import { CheckEventTracking } from '../../../../steps/Tracking';

const meetingTitle = "Test1!@#%^&*()-_+{}|:'<>?/.,{}'?><:L,./";

@autorun(test.skip)
@it
@p2
@title('Schedule a meeting with custom or default Subject')
export class RCI1749 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckEvent: StepFunction<any, any> = () => {};
  CheckEventTracking: StepFunction<any, any> = () => (
    <CheckEventTracking
      debug
      check={(logs) =>
        expect(
          logs.find(
            ({ event }) => event === trackEvents.clickMeetingSchedulePage,
          ),
        ).not.toBe(null)
      }
    />
  );

  @examples([
    {
      subject: meetingTitle,
    },
  ])
  run() {
    const { Login, CheckEvent, CheckEventTracking } = this;
    return (
      <Scenario desc="Schedule a meeting with custom or default Subject">
        <When
          desc="Open a calendar event which already exist meeting title,"
          action={Login}
        />
        <And desc="Wait for init" action={CheckRCVPageDisplay} />
        <When desc="Click 'Add Meeting'" action={ClickScheduleButton} />
        <Then
          desc="Schedule the meeting successfully with the subject kept"
          action={[CheckEvent, CheckEventTracking]}
        />
        {/* Check post meeting api params in this step */}
        <Then
          desc="In the RC Meetings client's meeting list, the topic is the same as the subject from Outlook"
          action={<CheckPostMeetingParams name={meetingTitle} />}
        />
      </Scenario>
    );
  }
}
