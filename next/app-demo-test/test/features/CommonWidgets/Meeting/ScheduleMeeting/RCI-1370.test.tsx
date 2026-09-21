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
  autorun,
  common,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CheckRCMPageDisplay,
  CheckRCVPageDisplay,
} from '../../../../steps/Meeting';
import { CreateMock, MockMessageSync } from '../../../../steps/Mock';
import { NavigateToMeeting } from '../../../../steps/Navigate';

@autorun(test)
@common
@it
@p2
@title(
  "User should see it's own schedule meeting page according to the video provider",
)
export class RCI1370 extends Step {
  Login: StepFunction<any, any> | StepFunction<any, any>[] = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  @examples(`
    | provider |
    | 'rcv'    |
    | 'rcm'    |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="User should see it's own schedule meeting page according to the video provider">
        <When
          desc="Direct to entry point"
          action={async ({ provider }: any) => [
            <CreateMock useRcm={provider === 'rcm'} />,
            <MockMessageSync isDefaultInit repeat={0} />,
            Login,
          ]}
        />
        <Then
          desc="User should see the {provider} schedule meeting"
          action={async ({ provider }: any) => [
            NavigateToMeeting,
            provider === 'rcv' ? CheckRCVPageDisplay : CheckRCMPageDisplay,
          ]}
        />
      </Scenario>
    );
  }
}
