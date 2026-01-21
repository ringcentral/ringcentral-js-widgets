/**
 * RCI-2618: Verify the app should recover normal mode when platform is accessible
 * https://test_it_domain/test-cases/RCI-2618
 * Preconditions:
 * Open the Charles
 * User login CTI app
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * The user opens the app-> Use Charles to catch this request and abort the response to simulate that platform is not accessible
 * Note(/s):
 * Entry point(/s):
 * The user opens the app-> Use Charles to catch this request and abort the response to simulate that platform is not accessible
 * Note(/s):
 * Request:'https://apps.ringcentral.com/integration/ping'
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

import {
  CheckCallControlPage,
  MakeOutboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckCallButtonActive } from '../../../../../steps/Dialer';
import {
  CheckConnectivityBadge,
  MockCheckConnection,
} from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

// TODO: unstable test
@autorun(test)
@common
@it
@p2
@title('Verify the app should recover normal mode when platform is accessible')
export class RCI2618 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    const checkConnectionFuncSpy = jest.fn();
    return (
      <Scenario
        desc="Verify the app should recover normal mode when platform is accessible"
        action={[CreateMock, MockMessageSync, Login]}
      >
        <When
          desc="Use Charles to catch this request and execute the response to simulate that platform is accessible
										Note(/s):
										Request:'https://apps.ringcentral.com/integration/ping'
										Catch this request instead of RC API request because this is the logic in the current code now, maybe need to discuss later"
          action={[
            <UseFakeTimers />,
            <MockCheckConnection
              handler={async () => {
                checkConnectionFuncSpy();
                // throw new Error();
              }}
            />,
          ]}
        />
        <Then
          desc="The badge'Offline' disappear
										All buttons are enabled
										Charles can not capture the request'https://apps.ringcentral.com/integration/ping'
										User can make the call"
          action={[
            <CheckConnectivityBadge exists={false} />,
            <NavigateTo path="/dialer" />,
            <CheckCallButtonActive />,
            () => {
              checkConnectionFuncSpy.mockReset();
              jest.advanceTimersByTime(5000 + 1000);
              jest.useRealTimers();
              expect(checkConnectionFuncSpy).not.toHaveBeenCalled();
            },
            <MakeOutboundCall phoneNumber={'+18882556247'} />,
            <CheckCallControlPage parsedNumber={'(888) 255-6247'} />,
          ]}
        />
      </Scenario>
    );
  }
}
