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
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import { CheckRCVPageDisplay } from '../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('Check CTI remains login status for a certain period of time')
export class RCI4160 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Check CTI remains login status for a certain period of time">
        <When desc="Direct to entry point" action={Login} />
        <Then
          desc="User should see the {provider} meeting page"
          action={CheckRCVPageDisplay}
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
          desc="User is still in login status"
          action={CheckRCVPageDisplay}
        />
      </Scenario>
    );
  }
}
