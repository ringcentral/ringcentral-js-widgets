/**
 * RCI-4031: Check instructions for Schedule on Behalf
 * https://test_it_domain/test-cases/RCI-4031
 * Preconditions:
 * UserA has RCV permission
 * UserA Already installed and logged in CTI app
 * UserB Set UserASchedule Meetings for mein SW
 *
  | Learn details |https://support.ringcentral.com/app/video/desktop-web/setting-delegate-schedule-meeting-on-your-behalf-outlook.html |
  |  |

 * Note:
 * 'Schedule Meetings for me': Service web(Service web) -> Admin Portal -> Users -> User List -> Users with Extensions->Meetings ->Schedule Meetings for me
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler
 * Outlook appointment: Login to Outlook > CalendarNew Meeting > RingCentral for Outlook
 */
import {
  autorun,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckRCVPageDisplay,
  CheckScheduleForGuidanceTooltip,
  HoverOnComponent,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Check instructions for Schedule on Behalf')
export class RCI4031 extends Step {
  Login: StepProp = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Check instructions for Schedule on Behalf" action={Login}>
        <When
          desc="Go to Entry point
										Hover the icon beside 'Schedule on behalf of' option"
          action={[
            CheckRCVPageDisplay,
            <HoverOnComponent dataSign="scheduleForGuidanceIcon" />,
          ]}
        />
        <Then
          desc="Show tooltip below:
	Title: Scheduling for someone else?
										Content:
	1. Make sure you're on their Outlook calendar.
										2. From the dropdown, select the person you're scheduling for.
										Link:Learn details
										The address of Learn details same as {Learn details}
										Title: Scheduling for someone else?
										Content:
										Link:Learn details
										1. Make sure you're on their Outlook calendar.
										2. From the dropdown, select the person you're scheduling for.
										[L10N]"
          action={CheckScheduleForGuidanceTooltip}
        />
      </Scenario>
    );
  }
}
