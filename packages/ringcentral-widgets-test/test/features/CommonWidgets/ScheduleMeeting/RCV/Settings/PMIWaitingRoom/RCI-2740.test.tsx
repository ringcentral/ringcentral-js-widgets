/**
 * RCI-2740: PMI waiting room values respect to SW settings when AuthCanJoin is locked
 * https://test_it_domain/test-cases/RCI-2740
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to the RC CTI app
 * Use RCV account only.
 * Entry point(/s):
 *
  | Waiting room option in SW |Waiting room option in CTI |
  | Everyone |Everyone |
	| Anyone outside of my company |Anyone outside of my company |
	| Anyone not signed in |Anyone not signed in |

 * > LoginSW: Admin Portal > Meetings > RingCentral Video > Meetings Settings > Security
 * > Lock'Only authenticated users can join'
 * > Turnon'Require participants to enter a waiting room before joining the meeting'
 * > Select{Waiting room option in SW}
 * > Then lock 'Require participants to enter a waiting room before joining the meeting'
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
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  CheckWaitingRoomDropdown,
  MarkOnPMIAndEdit,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title(
  'PMI waiting room values respect to SW settings when AuthCanJoin is locked',
)
export class RCI2740 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  @examples(`
    | waitingRoomOpt              | preferenceVal |
    | 'Everyone'                  | 'all'         |
    | 'Anyone outside my company' | 'notcoworker' |
    | 'Anyone not signed in'      | 'guests'      |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="PMI waiting room values respect to SW settings when AuthCanJoin is locked">
        <When desc="Go to Entry point" action={Login} />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="Mark on 'Use Personal Meeting ID'"
          action={<MarkOnPMIAndEdit />}
        />
        <Then
          desc="The Enable waiting room for the dropdown menu is disabled and view only
								The option selected should be {waitingRoomOpt}"
          action={
            <CheckWaitingRoomDropdown
              defaultValue={this.example.waitingRoomOpt}
            />
          }
        />
      </Scenario>
    );
  }
}
