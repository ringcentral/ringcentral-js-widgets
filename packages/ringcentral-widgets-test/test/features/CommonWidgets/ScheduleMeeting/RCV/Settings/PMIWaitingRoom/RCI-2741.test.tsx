/**
 * RCI-2741: PMI waiting room options when AuthCanJoin is unlocked
 * https://test_it_domain/test-cases/RCI-2741
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI app
 * Use RCV account only.
 * Do not lock 'Only authenticated users can join' from SW > Admin Portal > Meetings ->Security settings
 * Entry point(/s):
 * 1.RingCentral for Google/O365 Settings:More Menu ->schedule video meeting->Security
 * 2.Security settings in SW : SWAdmin Portal > Meetings ->Security settings
 * Settings:
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
  CheckDropDownStatus,
  TurnOnToggle,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('PMI waiting room options when AuthCanJoin is unlocked')
export class RCI2741 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  @examples(`
    | waitingRoomSW               | waitingRoomInSWVal | authCanJoinPMI         | waitingRoomOpt              |
    | 'Everyone'                  | 'all'              | 'Signed in users'      | 'Everyone'                  |
    | 'Everyone'                  | 'all'              | 'Signed in co-workers' | 'Everyone'                  |
    | 'Anyone outside my company' | 'notcoworker'      | 'Signed in users'      | 'Anyone outside my company' |
    | 'Anyone outside my company' | 'notcoworker'      | 'Signed in co-workers' | 'Everyone'                  |
    | 'Anyone not signed in'      | 'guests'           | 'Signed in users'      | 'Everyone'                  |
    | 'Anyone not signed in'      | 'guests'           | 'Signed in co-workers' | 'Everyone'                  |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="PMI waiting room options when AuthCanJoin is unlocked">
        <When
          desc="Go to Entry point: Turn on and select the value from 'Settings' <waitingRoomSetting in SW>
								then lock 'Require participants to enter a waiting room before joining the meeting' in'Security settings in SW
                select <authCanJoinPMI > for 'Only Authenticated user can join' in PMI settings"
          action={Login}
        />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="Mark on 'Use Personal Meeting ID'"
          action={<TurnOnToggle dataSign="usePersonalMeetingId" />}
        />
        <When
          desc="Check the value of'Enable waiting room for' should be the same as <waitingRoomOpt>"
          action={({ waitingRoomOpt }: any) => [
            <CheckboxIsChecked isChecked dataSign="enableWaitingRoom" />,
            <CheckboxIsLocked isLocked dataSign="isWaitingRoomWrapper" />,
            <CheckDropDownStatus
              // all pmi status is default as disabled
              isDisabled
              dataSign="waitingRoom"
              defaultValue={waitingRoomOpt}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
