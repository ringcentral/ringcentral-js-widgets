/**
 * RCI-3525: Participants camera and audio settings
 * https://test_id_domain/test-cases/RCI-3525
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins
 * Login withRCVaccount
 * Entry point(/s):
 * Scheduler: In the 'Schedule Meeting' panel
 * Outlook: On the settings page
 *
  | Turn off camera for participants |Mute audio for participants |
  | On |Off |
	| Off |On |

 */
import {
  CheckPostMeetingParams,
  ClickScheduleButton,
  CheckRCVPageDisplay,
  SwitchToggleTo,
} from '../../../../../../steps/Meeting';
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
  And,
  StepFunction,
} from '../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../steps/Login';

@autorun(test.skip)
@common
@it
@title('Participants camera and audio settings')
export class RCI3525 extends Step {
  Login: StepFunction<any, any>;

  @examples(`
    | muteVideo | muteAudio |
    | false     | true      |
    | true      | false     |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="Participants camera and audio settings">
        <When
          desc="Switch camera status of 'Participants' to {muteVideo} Switch audio status of 'Participants' to {muteAudio}"
          action={({ muteVideo, muteAudio }: any) => [
            Login,
            CheckRCVPageDisplay,
            <SwitchToggleTo dataSign="turnOffCamera" status={muteVideo} />,
            <SwitchToggleTo dataSign="muteAudio" status={muteAudio} />,
          ]}
        />
        <And desc="Click the Add Meeting button" action={ClickScheduleButton} />
        <Then
          desc="The status of Participants should be {muteVideo} and {muteAudio}"
          action={CheckPostMeetingParams}
        />
      </Scenario>
    );
  }
}
