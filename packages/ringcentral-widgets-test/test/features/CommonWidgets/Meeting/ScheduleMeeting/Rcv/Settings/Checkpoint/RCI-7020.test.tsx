/**
 * RCI-7020: Lock RCV settings item when admin lock the value
 * https://test_it_domain/test-cases/RCI-7020
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins
 * Login withRCVaccount
 * Admin lock the meeting item on SW:https://service-xmnup.lab.nordigy.ru/application/meetingsManagement/meetingsSettings
	Allow meetings to be recorded. Allow anyone to record in meeting
 * Allow meetings to be transcribed.Allow anyone to transcribe in meeting
 * Allow meetings to be recorded. Allow anyone to record in meeting
 * Allow meetings to be transcribed.Allow anyone to transcribe in meeting
 * Entry point(/s):
 * Scheduler: In the 'Schedule Meeting' panel
 *
  | Security item |Admin lock status |Display |
  | Allow to start and stop transcription |ON |Disabled |
	| Allow to start and stop transcription |OFF |Enabled |
	| Allow to start and stop recording |ON |Disabled |
	| Allow to start and stop recording |OFF |Enabled |

 */
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
  WaitForRenderReady,
  screen,
  common,
} from '@ringcentral-integration/test-utils';
import type { StepProp } from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import { CheckDropdown } from '../../../../../../../steps/Dropdown';
import { DropdownIsLocked } from '../../../../../../../steps/Meeting';
import { CreateMock } from '../../../../../../../steps/Mock';
import { MockRcvPreference } from '../../../../../../../steps/Mock/MockRcvPreference';

// !!NOTE: skip test for common, currently only scheduler and outlook use v2 api, other project still use v1 api
@autorun(test.skip)
@common
@it
@p2
@title('Lock RCV settings item when admin lock the value')
export class RCI7020 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | itemLabel                               | preferenceKey                      | dataSign           | isAdminLock | isDisabled |
    | 'Allow to start and stop transcription' | 'allow_anyone_transcribe_meetings' | 'allowTranscribe'  | true        | true       |
    | 'Allow to start and stop transcription' | 'allow_anyone_transcribe_meetings' | 'allowTranscribe'  | false       | false      |
    | 'Allow to start and stop recording'     | 'allow_anyone_record_meetings'     | 'allowToRecording' | true        | true       |
    | 'Allow to start and stop recording'     | 'allow_anyone_record_meetings'     | 'allowToRecording' | false       | false      |
  `)
  run() {
    return (
      <Scenario desc="Lock RCV settings item when admin lock the value">
        <When
          desc="Go to entry points, user is on {Admin lock status}"
          action={[
            this.CreateMock,
            <MockRcvPreference
              handle={(mockData) => {
                // filter allow_anyone_transcribe_meetings in preference to check default value in code
                mockData = mockData.filter(
                  ({ id }) => id !== this.example.preferenceKey,
                );
                mockData.push({
                  id: this.example.preferenceKey,
                  value: false,
                  readOnly: this.example.isAdminLock,
                  canModifyAccess: false,
                });
                return mockData;
              }}
            />,
            this.Login,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="The'Security item' display status is {Display}"
          action={[
            () => {
              const label = screen
                .getByTestId(this.example.dataSign)
                .querySelector('.labelText');
              expect(label).toHaveTextContent(this.example.itemLabel);
            },
            <CheckDropdown
              dataSign={this.example.dataSign}
              appName="Only host and moderators"
            />,
            <DropdownIsLocked
              dataSign={this.example.dataSign}
              isLocked={this.example.isAdminLock}
              isDisabled={this.example.isDisabled}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
