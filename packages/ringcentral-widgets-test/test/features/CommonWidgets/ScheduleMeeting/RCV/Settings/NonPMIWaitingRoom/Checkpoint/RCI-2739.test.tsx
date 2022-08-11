/**
 * RCI-2739: Waiting room values with respect to SW settings
 * https://test_id_domain/test-cases/RCI-2739
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

 * > Turnon'Require participants to enter a waiting room before joining the meeting'
 * > Select{Waiting room option in SW}
 * > Then lock 'Require participants to enter a waiting room before joining the meeting'
 */

import {
  p2,
  it,
  autorun,
  examples,
  StepFunction,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
  CheckDropDownStatus,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Waiting room values with respect to SW settings')
export class RCI2739 extends Step {
  Login: StepFunction<any, any>;
  @examples(`
    | waitingRoomOpt              | preferenceVal |
    | 'Everyone'                  | 'all'         |
    | 'Anyone outside my company' | 'notcoworker' |
    | 'Anyone not signed in'      | 'guests'      |
  `)
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="Waiting room values with respect to SW settings">
        <When desc="Go to Entry point" action={Login} />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <Then
          desc="Enable waiting room for should be on and locked
								The option selected should be {waitingRoomOpt}"
          action={({ waitingRoomOpt }: any) => [
            <CheckboxIsChecked isChecked dataSign="enableWaitingRoom" />,
            <CheckboxIsLocked isLocked dataSign="isWaitingRoomWrapper" />,
            <CheckDropDownStatus
              dataSign="waitingRoom"
              isDisabled
              defaultValue={waitingRoomOpt}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
