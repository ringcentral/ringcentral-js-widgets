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
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import { Ringout } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  And,
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { MakeOutboundCall } from '../../../../../steps/Call';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckCallButtonActive } from '../../../../../steps/Dialer';
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
    let fetchRingoutStatusSpy: jest.Spied;
    const checkConnectionFuncSpy = jest.fn();
    let retrySpy: jest.Spied;
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
          action={[
            Login,
            // Mock [API Request3] after logged in
            <MockGetStatus
              repeat={0}
              handler={(data) => {
                checkConnectionFuncSpy();
                return data;
              }}
            />,
            ((_, { app }) => {
              // AvailabilityMonitor module
              const availabilityMonitor =
                app.container.got(AvailabilityMonitor)!;
              expect(availabilityMonitor).toBeTruthy();
              retrySpy = jest.spyOn(availabilityMonitor, '_retry');
              // Ringout module
              ringout = app.container.got(Ringout)!;
              expect(ringout).toBeTruthy();
              fetchRingoutStatusSpy = jest.spyOn(
                ringout,
                '_fetchRingoutStatus',
              );
            }) as StepFunction,
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
