/**
 * RCI-2625: Verify the app should recover normal mode when API return 200 in the Ringout mode
 * https://test_it_domain/test-cases/RCI-2625
 * Preconditions:
 * Open the Charles
 * Change the calling setting to Ring out types
 * API Request:
 *
  | API Request |Request URL |
  | 1 |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/account/~/extension/~/sms |
	| 2 |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/oauth/token |
	| 3 |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status |

 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * > Login app
 * > Change the valid time of accessToken by Charles or change some API{API Request1}response status to 401
 * Entry point(/s):
 * > Login app
 * > Change the valid time of accessToken by Charles or change some API{API Request1}response status to 401
 * > Simulate Refresh token API{API Request2}returns 503 use Charles
 */
import type { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';
import { Ringout } from '@ringcentral-integration/commons/modules/Ringout';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  it,
  p2,
  title,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import { MakeOutboundCall } from '../../../../../steps/Call';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckConnectivityBadge, MockGetStatus } from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
  MockGetRingOut,
  MockPostOauthToken,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import {
  CheckCallWithOption,
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../steps/Settings';
import { CheckCallButtonActive } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app should recover normal mode when API return 200 in the Ringout mode',
)
export class RCI2625 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let ringout: Ringout;
    let fetchRingoutStatusSpy: jest.SpyInstance;
    const checkConnectionFuncSpy = jest.fn();
    let retrySpy: jest.SpyInstance;
    return (
      <Scenario desc="Verify the app should recover normal mode when API return 200 in the Ringout mode">
        <Given
          desc="> Change the valid time of accessToken by Charles or change some API {API Request1} response status to 401
                > Simulate Refresh token API {API Request2} returns 503 use Charles"
          action={() => [
            CreateMock,
            MockGetPhoneNumber,
            MockGetRingOut,

            // [API Request2] -> 503
            <MockPostOauthToken failure repeat={1} failureCode={503} />,
          ]}
        />
        <And
          desc="Login app"
          action={(_: unknown, context: Context) => [
            Login,
            // Mock [API Request3] after logged in
            <MockGetStatus
              repeat={0}
              handler={(data) => {
                checkConnectionFuncSpy();
                return data;
              }}
            />,
            () => {
              // AvailabilityMonitor module
              const availabilityMonitor: AvailabilityMonitor =
                context.phone.availabilityMonitor;
              expect(availabilityMonitor).toBeTruthy();
              retrySpy = jest.spyOn(availabilityMonitor, '_retry');
              // Ringout module
              ringout = context.phone.ringout;
              expect(ringout).toBeTruthy();
              fetchRingoutStatusSpy = jest.spyOn(
                ringout,
                '_fetchRingoutStatus',
              );
            },
          ]}
        />
        <And
          desc="Select RingOut mode"
          action={() => [
            // Select RingOut mode
            <NavigateTo path="/settings/calling" />,
            <ExpandCallingSettingDropdown />,
            <SelectCallingSetting settingName="RingOut" />,
            <ClickSaveButton />,
            <CheckCallWithOption exists optionText={'RingOut'} />,
          ]}
        />
        <Then
          desc="App should start health checking"
          action={() => [
            <RefreshToken healthCheck />,
            async () => {
              expect(retrySpy).toHaveBeenCalledTimes(1);
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(1);
              retrySpy.mockReset();
              checkConnectionFuncSpy.mockReset();
            },
          ]}
        />
        <When
          desc="Simulate Refresh token API {API Request2} returns 200 use Charles"
          action={() => [
            // [API Request2] -> 200
            <MockPostOauthToken
              isDefaultInit={false}
              failure={false}
              repeat={0}
            />,
            <RefreshToken />,
          ]}
        />
        <Then
          desc="The badge'Offline' disappear
										All buttons are enabled
										Can not capture the request of the /status API {API Request3} by Charles
										User can make the call"
          action={() => [
            <CheckConnectivityBadge exists={false} />,
            <NavigateTo path="/dialer" />,
            <CheckCallButtonActive />,
            () => {
              expect(retrySpy).toHaveBeenCalledTimes(0);
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(0);
            },
            <MakeOutboundCall phoneNumber={'105'} />,
            async () => {
              const ringoutId = fetchRingoutStatusSpy.mock.calls[0][0];
              expect(ringoutId).toBe(
                'Y3MxNjg2MzAwMTIyMTAwMTM1OTM5QDEwLjEzLjIyLjI1Mg',
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
