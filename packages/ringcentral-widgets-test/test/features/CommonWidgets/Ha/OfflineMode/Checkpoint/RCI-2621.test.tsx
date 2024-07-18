/**
 * RCI-2621: Verify the app enter offline mode when API return 503 in the Ringout mode
 * https://test_it_domain/test-cases/RCI-2621
 * Preconditions:
 * Open the charles
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
 * > Login app with RC account
 * Entry point(/s):
 * > Login app with RC account
 * > Change the calling setting to Ring out types
 */
import type { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';
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
import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { MockGetStatus, CheckConnectivityBadge } from '../../../../../steps/Ha';
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
import { CheckCallButtonDisabled } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app enter offline mode when API return 503 in the Ringout mode',
)
export class RCI2621 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let availabilityMonitor: AvailabilityMonitor;
    let retrySpy: jest.SpyInstance;
    const checkConnectionFuncSpy = jest.fn();
    return (
      <Scenario desc="Verify the app enter offline mode when API return 503 in the Ringout mode">
        <Given
          desc="> Change the valid time of accessToken by Charles or change some API {API Request1} response status to 401
										> Simulate  Refresh token API {API Request2} returns 503 use Charles"
          action={() => [
            CreateMock,
            MockGetPhoneNumber,
            MockGetRingOut,

            // [API Request2] -> 503
            <MockPostOauthToken failure repeat={0} failureCode={503} />,
          ]}
        />
        <And
          desc="Login app"
          action={(_: unknown, context: Context) => [
            Login,
            // Mock [API Request3] after logged in
            <MockGetStatus
              handler={(data) => {
                checkConnectionFuncSpy();
                return data;
              }}
            />,
            // Spy on [API Request3] after logged in
            () => {
              availabilityMonitor = context.phone.availabilityMonitor;
              expect(availabilityMonitor).toBeTruthy();
              retrySpy = jest.spyOn(availabilityMonitor, '_retry');
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
        <When
          desc="App refresh token"
          action={() => [<RefreshToken healthCheck />]}
        />
        <Then
          desc="The badge 'Offline' promote
										Alert message: 'Sorry, something went wrong on our end. Try again later.'
										All buttons are disabled
										Can capture the request of the /status API {API Request3} by Charles every 60 seconds"
          action={() => [
            <CheckConnectivityBadge exists={true} textContent={'Offline'} />,
            <CheckContainsAlertMessage
              message={
                'Sorry, something went wrong on our end. Try again later.'
              }
            />,
            <NavigateTo path="/dialer" />,
            <CheckCallButtonDisabled />,
            () => {
              expect(retrySpy).toHaveBeenCalledTimes(1);
              expect(availabilityMonitor._healthRetryTime).toBe(60 * 1000);
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(1); // check [API Request3]
            },
          ]}
        />
      </Scenario>
    );
  }
}
