/**
 * RCI-5655: Keep accept call queue calls toggle set by the user
 * https://test_it_domain/test-cases/RCI-5655
 * Preconditions:
 * 1. RC CTI app has installed and enabled
 * 2. User must have logged into 3rd party
 * 3. User must have logged into RC app
 * 4. User is a call queue member of CallQueue1
 * 5. User B is no call queue account
 * Entry point(/s):
 * > Go to Settings
 */

import {
  p2,
  it,
  autorun,
  And,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';
import type { StepFunction } from '../../../../lib/step';
import { Login as CommonLogin } from '../../../../steps/Login';
import { NavigateTo } from '../../../../steps/Router/action';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
  MockPresence,
} from '../../../../steps/Mock';
import {
  ClickLogoutButton,
  SetPresenceStatus,
  SetAcceptCallQueueCalls,
} from '../../../../steps/Settings/actions';
import { CheckAcceptCallQueueCalls } from '../../../../steps/Settings';

@autorun(test)
@it
@p2
@title('Keep accept call queue calls toggle set by the user')
class KeepAcceptCallQueueCalls extends Step {
  Login?: StepFunction<any, any>;
  CreateMock?: StepFunction<any, any>;

  run() {
    const { Login = CommonLogin, CreateMock = CommonCreateMock } = this;

    return (
      <Scenario desc="Keep accept call queue calls toggle set by the user">
        <Given
          desc="Create phone instance and login"
          action={[CreateMock, MockMessageSync, MockPresence, Login]}
        />
        <And
          desc="App navigate to setting page"
          action={<NavigateTo path="/settings" />}
        />
        <When
          desc="Turn off the 'Accept call queue calls' toggle, then logout then login again
										Select 'Do not disturb' in the 'Status' section"
          action={[
            // Turn off the 'Accept call queue calls' toggle
            <SetAcceptCallQueueCalls isAccept={false} />,

            // logout
            <ClickLogoutButton />,
            WaitForRenderReady,

            // login again
            <Login reLogin={true} />,
            WaitForRenderReady,

            // Select 'Do not disturb' in the 'Status' section
            <NavigateTo path="/settings" />,
            <SetPresenceStatus presence="DND" />,
          ]}
        />
        <Then
          desc="'Accept call queue calls' toggle is turned off
										The toggle is disabled for editing"
          action={
            <CheckAcceptCallQueueCalls isAccept={false} isDisabled={true} />
          }
        />
        <When
          desc="Select status other than 'Do not disturb'"
          action={<SetPresenceStatus presence="available" />}
        />
        <Then
          desc="'Accept call queue calls' toggle is keep turn off
										The toggle is editable"
          action={
            <CheckAcceptCallQueueCalls isAccept={false} isDisabled={false} />
          }
        />
        {/* <When
          desc="Logout then login with user B, change status to 'Do not Disturb' then change status to 'Available'"
          action={}
        />
        <Then desc="Change status successfully" action={} /> */}
      </Scenario>
    );
  }
}
