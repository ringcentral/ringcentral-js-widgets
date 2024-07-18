/**
 * RCI-2607: Verify the alert message when user clicks the offline badge
 * https://test_it_domain/test-cases/RCI-2607
 * Preconditions:
 * User login CTI app
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * > Disconnect the network then the app enters the offline mode
 * Entry point(/s):
 * > Disconnect the network then the app enters the offline mode
 * Note(/s):OpenBackground > Network >  Network conditions > 'Network throttling > 'Select 'Offline'
 */
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

import type { StepFunction } from '../../../../../lib/step';
import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  ClickConnectivityBadge,
  MockNetworkOffline,
} from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
} from '../../../../../steps/Mock';

@autorun(test)
@common
@it
@p2
@title('Verify the alert message when user clicks the offline badge')
export class RCI2607 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Verify the alert message when user clicks the offline badge"
        action={() => [CreateMock, MockMessageSync, Login, MockNetworkOffline]}
      >
        <When
          desc="Click the offline badge"
          action={<ClickConnectivityBadge textContent={'Offline'} />}
        />
        <Then
          desc="Prompt alert message: 'Sorry, something went wrong, check your network connection and try again. '"
          action={
            <CheckContainsAlertMessage
              message={
                'Sorry, something went wrong, check your network connection and try again.'
              }
            />
          }
        />
      </Scenario>
    );
  }
}
