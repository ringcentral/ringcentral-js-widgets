/**
 * RCI-2626: Verify the app enter offline mode when API return 503 in the Webphone is unavailable
 * https://test_it_domain/test-cases/RCI-2626
 * Preconditions:
 * Open the Charles
 * The webphone is unavailable
 * API Request:
 *
  | API Request |Request URL |
  | 1 |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/account/~/extension/~/sms |
	| 2 |https://api-rcapps-xmnup.lab.nordigy.ru/restapi/oauth/token |
	| 3 | https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status |

 * Note(/s): Webphone unavailable:Simulate 3 times sipProvisionError
 * >Intercept requesthttps://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/client-info/sip-provisionwith Charles
 * > ChangeHTTPS response's status code to 500
 * >Retry another 2 times sipProvisionError
 * > Enter WebRTC unavailable mode
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * > Login app with rc account
 */
import type { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';
import {
  And,
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import {
  MockSipProvision,
  TriggerWebphoneEvent,
} from '../../../../../steps/Call/Webphone';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { MockGetStatus, CheckConnectivityBadge } from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
  MockMessageSync,
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
  'Verify the app enter offline mode when API return 503 in the Webphone is unavailable',
)
export class RCI2626 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    const checkConnectionFuncSpy = jest.fn();
    return (
      <Scenario desc="Verify the app enter offline mode when API return 503 in the Webphone is unavailable">
        <When
          desc="Start app"
          action={() => [
            CreateMock,
            MockMessageSync,
            MockGetPhoneNumber,
            Login,
          ]}
        />
        <Then
          desc="Select Browser mode"
          action={() => [
            // Select WebRTC mode
            <NavigateTo path="/settings/calling" />,
            <ExpandCallingSettingDropdown />,
            <SelectCallingSetting settingName="Browser" />,
            <ClickSaveButton />,
            <CheckCallWithOption exists optionText={'Browser'} />,
          ]}
        />
        <And
          desc="Intercept request https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/client-info/sip-provision with Charles
          * > ChangeHTTPS response's status code to 500"
          action={() => [
            // Simulate sipProvisionError -> 500
            <MockSipProvision repeat={0} status={500} />,
            <TriggerWebphoneEvent eventName={'provisionUpdate'} />,
          ]}
        />
        <Then
          desc="Then the webphone is unavailable"
          action={() => [
            <WaitForRenderReady />,
            <CheckConnectivityBadge
              exists={true}
              textContent={'Web Phone Unavailable'}
            />,
          ]}
        />
        <When
          desc="> Change the valid time of accessToken by Charles or change some API {API Request1} response status to 401
										> Simulate Refresh token API {API Request2} returns>=500 use Charles"
          action={() => [
            // oauth token -> 503
            <MockPostOauthToken
              isDefaultInit={false}
              failure
              repeat={0}
              failureCode={503}
            />,
            // Mock [API Request3] after logged in
            <MockGetStatus
              handler={(data) => {
                checkConnectionFuncSpy();
                throw new Error();
              }}
            />,
            <RefreshToken healthCheck />,
          ]}
        />
        <Then
          desc="The badge 'Offline' promote
										Alert message: 'Cannot connect to the server. Please retry later.'
										All buttons are disabled
										Can capture the request of the /status API {API Request3} by Charles every 60 seconds"
          action={() => [
            <WaitForRenderReady />,
            <CheckConnectivityBadge exists={true} textContent={'Offline'} />,
            <CheckContainsAlertMessage
              message={'Cannot connect to the server. Please retry later.'}
            />,
            <NavigateTo path="/dialer" />,
            <CheckCallButtonDisabled />,
            (_: unknown, context: Context) => {
              const availabilityMonitor: AvailabilityMonitor =
                context.phone.availabilityMonitor;
              expect(availabilityMonitor).toBeTruthy();
              expect(availabilityMonitor._healthRetryTime).toBe(60 * 1000);
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(1); // check [API Request3]
            },
          ]}
        />
      </Scenario>
    );
  }
}
