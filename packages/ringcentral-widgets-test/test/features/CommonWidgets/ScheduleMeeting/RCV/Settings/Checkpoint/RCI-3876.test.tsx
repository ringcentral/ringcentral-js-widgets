/**
 * RCI-3876: Schedule "Join after host" meeting
 * https://test_it_domain/test-cases/RCI-3876
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins
 * Login withRCVaccount
 * Entry point(/s):
 * Scheduler: In the 'Schedule Meeting' panel
 * Outlook: On the settings page
 *
  | JAH status |
  | On |
	| Of |

 */

import {
  CheckPostMeetingParams,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  SwitchToggleTo,
} from '../../../../../../steps/Meeting';
import type { StepFunction } from '../../../../../../lib/step';
import {
  common,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  p1,
} from '../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../steps/Login';

@autorun(test.skip)
@common
@it
@p1
@title('Schedule "Join after host" meeting')
export class RCI3876 extends Step {
  Login: StepFunction<any, any>;
  @examples(`
    | allowJoinBeforeHost |
    | true                |
    | false               |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc='Schedule "Join after host" meeting'>
        <When
          desc="> Change 'Allow participants to join before host' option to {allowJoinBeforeHost}
										> Click the Add meeting button"
          action={async ({ allowJoinBeforeHost }: any) => [
            Login,
            CheckRCVPageDisplay,
            <SwitchToggleTo
              dataSign="allowJoinBeforeHost"
              // Note: allowJoinBeforeHost value and the checkbox status are opposite
              status={!allowJoinBeforeHost}
            />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="The'Allow participants to join before host' should be {allowJoinBeforeHost}"
          action={CheckPostMeetingParams}
        />
      </Scenario>
    );
  }
}
