/**
 * RCI-4160: Check CTI remains login status for a certain period of time
 * https://test_it_domain/test-cases/RCI-4160
 * Preconditions:
 * RC CTI app is installed and enabled
 * User must have an RC CTI account
 * User hasn't logged in to the RC CTI app
 * User has opened the Oauth page
 * Entry point(/s):
 * > Click the 'Sign in ' button
 * > Enter the phone email address or phone number
 * >Press the 'Sign In' button
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckLoginButtonExists,
  CommonLogin,
} from '../../../../steps/CommonLogin';
import { CreateMock as CommonCreateMock } from '../../../../steps/Mock';

@autorun(test)
@common
@it
@p2
@title('Check CTI remains login status for a certain period of time')
export class RCI4160 extends Step {
  Login: StepFunction<any, any> = () => [CommonCreateMock, CommonLogin];
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Check CTI remains login status for a certain period of time">
        <When desc="Direct to entry point" action={Login} />
        <Then
          desc="User should not in login page"
          action={<CheckLoginButtonExists exists={false} />}
        />
        <When
          desc="Check CTI in login status after 30 mins"
          action={async () => {
            jest.useFakeTimers();
            jest.advanceTimersByTime(30 * 60 * 1000);
            jest.useRealTimers();
          }}
        />
        <Then
          desc="User is still in not in login page"
          action={<CheckLoginButtonExists exists={false} />}
        />
      </Scenario>
    );
  }
}
