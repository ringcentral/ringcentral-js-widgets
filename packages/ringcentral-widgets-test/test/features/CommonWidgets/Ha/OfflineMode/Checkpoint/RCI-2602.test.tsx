/**
 * RCI-2602: Verify the app enter offline mode when disconnect network
 * https://test_it_domain/test-cases/RCI-2602
 * Preconditions:
 * User login CTI app
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * The user is making an inbound /outbound call
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
  UseFakeTimers,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  MockNetworkOffline,
  CheckConnectivityBadge,
} from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckCallButtonDisabled } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title('Verify the app enter offline mode when disconnect network')
export class RCI2602 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let checkConnectionFuncSpy: jest.SpyInstance;
    return (
      <Scenario
        desc="The user is making an inbound /outbound call"
        action={() => [CreateMock, MockMessageSync, Login]}
      >
        <When
          desc="Disconnect the network
										Note(/s): OpenBackground > Network >  Network conditions > 'Network throttling > 'Select 'Offline'"
          action={(_: unknown, context: Context) => [
            () => {
              const { connectivityMonitor } = context.phone;
              // spy on request GET https://apps.ringcentral.com/integration/ping
              checkConnectionFuncSpy = jest
                .spyOn(connectivityMonitor, '_checkConnectionFunc')
                .mockImplementation(() => {
                  throw new Error();
                });
            },
            <UseFakeTimers />,
            <MockNetworkOffline />,
          ]}
        />
        <Then
          desc="The badge 'Offline' prompt
										Alert message: 'Sorry, something went wrong, check your network connection and try again. '
										All buttons are disabled
										Can capture the request 'https://apps.ringcentral.com/integration/ping'every 5 seconds in the background network
										Note(/s): This request may be not necessarily accurate 5s request because of network etc."
          action={() => [
            <CheckConnectivityBadge exists={true} textContent={'Offline'} />,
            <CheckContainsAlertMessage
              message={
                'Sorry, something went wrong, check your network connection and try again.'
              }
            />,
            <NavigateTo path="/dialer" />,
            <CheckCallButtonDisabled />,
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
