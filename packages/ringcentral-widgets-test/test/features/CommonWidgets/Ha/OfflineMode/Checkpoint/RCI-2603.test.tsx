/**
 * RCI-2603: Verify the app should recover normal from offline mode when connected network
 * https://test_it_domain/test-cases/RCI-2603
 * Preconditions:
 * User login CTI app
 * The user has entered the offline mode
 * Note(/s):OpenBackground > Network >  Network conditions > 'Network throttling > 'Select 'Offline'
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 *
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
import {
  MakeOutboundCall,
  CheckCallControlPage,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  MockNetworkOffline,
  MockNetworkOnline,
  CheckConnectivityBadge,
} from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckCallButtonActive } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app should recover normal from offline mode when connected network',
)
export class RCI2603 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let checkConnectionFuncSpy: jest.SpyInstance;
    return (
      <Scenario
        desc="Verify the app should recover normal from offline mode when connected network"
        action={() => [CreateMock, MockMessageSync, Login, MockNetworkOffline]}
      >
        <When
          desc="Connect the network
										Note(/s):OpenBackground > Network >  Network conditions > 'Network throttling > 'Select 'No throttling'"
          action={(_: unknown, context: Context) => [
            () => {
              const { connectivityMonitor } = context.phone;
              // spy on request GET https://apps.ringcentral.com/integration/ping
              checkConnectionFuncSpy = jest
                .spyOn(connectivityMonitor, '_checkConnectionFunc')
                .mockImplementation(jest.fn());
            },
            <UseFakeTimers />,
            <MockNetworkOnline />,
          ]}
        />
        <Then
          desc="The badge'Offline' disappear
										All buttons are enabled
										Charles can not capture the request'https://apps.ringcentral.com/integration/ping'
										User can make the call"
          action={() => [
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
