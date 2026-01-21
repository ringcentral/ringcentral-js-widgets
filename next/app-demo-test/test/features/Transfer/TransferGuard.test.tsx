import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import { Entry as CommonEntry } from '../../steps/Entry';
import { Login as CommonLogin } from '../../steps/Login';
import { CreateMock as CommonCreateMock } from '../../steps/Mock';
import { CheckRoutePathIs, NavigateTo } from '../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('TransferGuard, when not have any session, should redirect to dialer')
export class TransferGuard extends Step {
  Login = CommonLogin as StepFunction<any, any>;
  CreateMock = CommonCreateMock as StepFunction<any, any>;
  Entry = CommonEntry as StepFunction<any, any>;

  @examples(`
    | path       | result    |
    | 'active'   | '/calls'  |
    | 'webphone' | '/dialer' |
  `)
  run() {
    return (
      <Scenario desc="Check message syncToken invalid">
        <Given
          desc="user login in app"
          action={[this.CreateMock, this.Entry]}
        />
        <When desc="user login in app" action={this.Login} />
        <When
          desc="redirect to transfer page when not have any session"
          action={<NavigateTo path={`/transfer/123/${this.example.path}`} />}
        />
        <Then
          desc="should redirect to dialer page"
          action={[
            WaitForRenderReady,
            <CheckRoutePathIs path={this.example.result} />,
          ]}
        />
      </Scenario>
    );
  }
}
