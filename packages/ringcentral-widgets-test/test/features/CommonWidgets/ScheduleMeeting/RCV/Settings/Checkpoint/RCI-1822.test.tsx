/**
 * RCI-1822: RCV - Restrict screen sharing to host & moderators
 * https://test_it_domain/test-cases/RCI-1822
 * Preconditions:
 * RC for Google/O365 app is installed and enabled
 * Users have an RCV account that is usable.
 * Entry point(/s):
 * Google browser: > Standalone app/floating window > More > Schedule Video Meeting
 * For salesforce: More Menu > Schedule Video Meeting
 *
  | Can share |
  | On |
	| Off |

 */
import {
  CheckPostMeetingParams,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  SwitchToggleTo,
} from '../../../../../../steps/Meeting';
import {
  p2,
  it,
  autorun,
  examples,
  common,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../steps/Login';

@autorun(test.skip)
@it
@p2
@title('RCV - Restrict screen sharing to host & moderators')
@common
export class RCI1822 extends Step {
  @examples(`
    | allowScreenSharing |
    | false              |
    | true               |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="RCV - Restrict screen sharing to host & moderators">
        <When
          desc="Turn Only host & moderators can share screen to {allowScreenSharing}"
          action={({ allowScreenSharing }: any) => [
            Login,
            CheckRCVPageDisplay,
            <SwitchToggleTo
              dataSign="limitScreenSharing"
              status={!allowScreenSharing}
            />,
          ]}
        />
        <And desc="Schedule a meeting" action={ClickScheduleButton} />
        <Then
          desc="The status ofOnly host & moderators can share screen should be{allowScreenSharing}"
          action={CheckPostMeetingParams}
        />
      </Scenario>
    );
  }
}
