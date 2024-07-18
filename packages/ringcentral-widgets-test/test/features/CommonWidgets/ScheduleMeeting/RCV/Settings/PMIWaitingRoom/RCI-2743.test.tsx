/**
 * RCI-2743: PMI waiting room default values
 * https://test_it_domain/test-cases/RCI-2743
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to the RC CTI app
 * Use RCV account only.
 * Do not lock 'Only authenticated users can join' and 'Require participants to enter a waiting room before joining the meeting'from SW
 * Note(/s):
 * SW:>Admin Portal > Meetings > RingCentral Video > Meetings Settings > Security
 * Entry point(/s):
 *
  | RCV web waiting room option |CTI waiting room option |
  | Everyone |Everyone |
	| Anyone outside my company |Anyone outside my company |
	| Anyone not signed in |Anyone not signed in |

 * > LoginRCV web> Settings > Personal Meeting ID
 * > Select{RCV web waiting room option}for'Enable waiting room for'
 * Note(/s):
 * RCV web:https://v.ringcentral.com/welcome/join/
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
  And,
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
@title('PMI waiting room default values')
export class RCI2743 extends Step {
  Login: StepFunction<any, any>;
  @examples(`
    | waitingRoomOpt              | waitingRoomPMIVal |
    | 'Everyone'                  | 1                 |
    | 'Anyone outside my company' | 3                 |
    | 'Anyone not signed in'      | 2                 |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="Waiting room values with respect to SW settings">
        <When desc="Go to Entry point" action={Login} />
        <And
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="Mark on 'Use Personal Meeting ID'"
          action={<TurnOnToggle dataSign="usePersonalMeetingId" />}
        />
        <Then
          desc="The value should be ${waitingRoomOpt}"
          action={({ waitingRoomOpt }: any) => [
            <CheckboxIsChecked isChecked dataSign="enableWaitingRoom" />,
            <CheckboxIsLocked
              isLocked={false}
              dataSign="isWaitingRoomWrapper"
            />,
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
