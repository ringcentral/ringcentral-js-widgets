/**
 * RCI-2744: PMI waiting room options when AuthCanJoin is locked and the waiting room is unlocked
 * https://test_it_domain/test-cases/RCI-2744
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to the RC CTI app
 * Use RCV account only.
 * Entry point(/s):
 *
  | Auth can join |PMI waiting room |Waiting room option |
  | Signed in users |Everyone |Everyone |
	| Signed in co-workers |Everyone |Everyone |
	| Signed in users |Anyone outside my company |Anyone outside my company |
	| Signed in co-workers |Anyone outside my company |waitingRoomSW |
	| Signed in users |Anyone not signed in |waitingRoomSW |
	| Signed in co-workers |Anyone not signed in |waitingRoomSW |

 * > LoginSW: Admin Portal > Meetings > RingCentral Video > Meetings Settings > Security
 * >Donot lockthe'Only authenticated users can join'
 * >Turnon'Only authenticated users can join'
 * >Select{Auth can join}for the'Only authenticated users can join'
 * > Lockthe'Only authenticated users can join'
 * > LoginRCV web> Settings > Personal Meeting ID
 * > Select{PMI waiting room}for'Enable waiting room for'
 * Note(/s):
 * RCV web:https://v.ringcentral.com/welcome/join/
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
@title(
  'PMI waiting room options when AuthCanJoin is locked and the waiting room is unlocked',
)
export class RCI2744 extends Step {
  Login: StepFunction<any, any>;
  @examples(`
    | authCanJoinInSW        | waitingRoomInSW             | waitingRoomInSWVal | waitingRoomInPMIVal | waitingRoomInPMI            | waitingRoomOpt              |
    | 'Signed in users'      | 'Everyone'                  | 'all'              | 1                   | 'Everyone'                  | 'Everyone'                  |
    | 'Signed in users'      | 'Anyone outside my company' | 'notcoworker'      | 1                   | 'Everyone'                  | 'Everyone'                  |
    | 'Signed in co-workers' | 'Everyone'                  | 'all'              | 1                   | 'Everyone'                  | 'Everyone'                  |
    | 'Signed in users'      | 'Everyone'                  | 'all'              | 3                   | 'Anyone outside my company' | 'Anyone outside my company' |
    | 'Signed in users'      | 'Anyone outside my company' | 'notcoworker'      | 3                   | 'Anyone outside my company' | 'Anyone outside my company' |
    | 'Signed in co-workers' | 'Everyone'                  | 'all'              | 3                   | 'Anyone outside my company' | 'Everyone'                  |
    | 'Signed in users'      | 'Everyone'                  | 'all'              | 2                   | 'Anyone not signed in'      | 'Everyone'                  |
    | 'Signed in users'      | 'Anyone outside my company' | 'notcoworker'      | 2                   | 'Anyone not signed in'      | 'Anyone outside my company' |
    | 'Signed in co-workers' | 'Everyone'                  | 'all'              | 2                   | 'Anyone not signed in'      | 'Everyone'                  |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="PMI waiting room options when AuthCanJoin is locked and the waiting room is unlocked">
        <When desc="Go to Entry point" action={Login} />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="Mark on 'Use Personal Meeting ID'"
          action={<TurnOnToggle dataSign="usePersonalMeetingId" />}
        />
        <Then
          desc="Check the Enable waiting room for status and option, which should be {waitingRoomOpt}"
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
