/**
 * RCI-1370: User should see it's own schedule meeting page according to the video provider
 * https://test_it_domain/test-cases/RCI-1370
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * Extension type(/s):
 * Entry point(/s):
 * 1.Login CTI with RCM provider account > More > Schedule meeting
 * Entry point(/s):
 * 1.Login CTI with RCM provider account > More > Schedule meeting
 * 2.Login CTI with RCV provider account > More > Schedule meeting
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  CheckRCMPageDisplay,
} from '../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title(
  "User should see it's own schedule meeting page according to the video provider",
)
export class RCI1370 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  @examples(`
    | provider |
    | 'rcv'    |
    | 'rcm'    |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="User should see it's own schedule meeting page according to the video provider">
        <When desc="Direct to entry point" action={Login} />
        <Then
          desc="User should see the {provider} schedule meeting"
          action={async ({ provider }: any) => [
            provider === 'rcv' ? CheckRCVPageDisplay : CheckRCMPageDisplay,
          ]}
        />
      </Scenario>
    );
  }
}
