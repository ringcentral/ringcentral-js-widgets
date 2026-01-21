/**
 * RCI-2609: Verify the app enter offline mode when platform is not accessible
 * https://test_it_domain/test-cases/RCI-2609
 * Preconditions:
 * User login CTI app
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * The user opens the app
 */
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  UseFakeTimers,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckCallButtonDisabled } from '../../../../../steps/Dialer';
import {
  CheckConnectivityBadge,
  MockCheckConnection,
} from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('Verify the app enter offline mode when platform is not accessible')
export class RCI2609 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  CheckCallBtnDisabled: StepFunction<any, any> = CheckCallButtonDisabled;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login, CheckCallBtnDisabled } = this;
    const checkConnectionFuncSpy = jest.fn();
    return (
      <Scenario
        desc="Verify the app enter offline mode when platform is not accessible"
        action={[CreateMock, MockMessageSync, Login]}
      >
        <When
          desc="Use Charles to catch this request and abort response to simulate that platform is not accessible
										Note(/s):
										Request:'https://apps.ringcentral.com/integration/ping'
										Catch this request instead of RC API request because this is the logic in the current code now, maybe need to discuss later"
          action={[
            <UseFakeTimers />,
            <MockCheckConnection
              handler={async () => {
                checkConnectionFuncSpy();
                throw new Error();
              }}
            />,
          ]}
        />
        <Then
          desc="The badge 'Offline' prompt
										Prompt the alert message: 'Cannot connect to the server. Please retry later.'
										All buttons are disabled
										Can capture the request 'https://apps.ringcentral.com/integration/ping' in background network"
          action={[
            <CheckConnectivityBadge exists={true} textContent={'Offline'} />,
            <CheckContainsAlertMessage
              message={'Cannot connect to the server. Please retry later.'}
            />,
            <NavigateTo path="/dialer" />,
            CheckCallBtnDisabled,
            () => {
              checkConnectionFuncSpy.mockReset();
              jest.advanceTimersByTime(5000 + 1000);
              jest.useRealTimers();
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(1);
            },
          ]}
        />
      </Scenario>
    );
  }
}
