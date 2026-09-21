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
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  And,
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckContainsAlertMessage } from '../../../../../steps/Alert';
import {
  MockSipProvision,
  TriggerWebphoneEvent,
} from '../../../../../steps/Call/Webphone';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckCallButtonDisabled } from '../../../../../steps/Dialer';
import { CheckConnectivityBadge, MockGetStatus } from '../../../../../steps/Ha';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
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
  'Verify the app enter offline mode when API return 503 in the Webphone is unavailable',
)
export class RCI2626 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let availabilityMonitor: AvailabilityMonitor;
    let retrySpy: jest.Spied;
    const checkConnectionFuncSpy = jest.fn();
    return (
      <Scenario desc="Verify the app enter offline mode when API return 503 in the Webphone is unavailable">
        <When
          desc="Intercept request https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/client-info/sip-provision with Charles
          * > ChangeHTTPS response's status code to 500"
          action={() => [
            CreateMock,
            MockGetPhoneNumber,
            // oauth token -> 503
            <MockPostOauthToken failure repeat={0} failureCode={503} />,
          ]}
        />
        <And
          desc="Start app"
          action={() => [
            Login,
            // Mock [API Request3] after logged in
            <MockGetStatus
              handler={(data) => {
                checkConnectionFuncSpy();
                return data;
              }}
            />,
            ((_, { app }) => {
              availabilityMonitor = app.container.got(AvailabilityMonitor)!;
              expect(availabilityMonitor).toBeTruthy();
              retrySpy = jest.spyOn(availabilityMonitor, '_retry');
            }) as StepFunction,
          ]}
        />
        <And
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
          desc="Simulate sipProvisionError"
          action={() => [
            // sipProvisionError -> 500
            <MockSipProvision repeat={0} status={500} />,
            <TriggerWebphoneEvent
              eventName="registrationFailed"
              args={[{ statusCode: 500 }]}
            />,
          ]}
        />
        <Then
          desc="Then the webphone is unavailable"
          action={() => [
            <CheckConnectivityBadge
              exists={true}
              textContent={'Web Phone Unavailable'}
            />,
          ]}
        />
        <When
          desc="> Change the valid time of accessToken by Charles or change some API {API Request1} response status to 401
										> Simulate Refresh token API {API Request2} returns>=500 use Charles"
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
              expect(availabilityMonitor._healthRetryTime).toBe(60 * 1000);
              expect(checkConnectionFuncSpy).toHaveBeenCalledTimes(1); // check [API Request3]
            },
          ]}
        />
      </Scenario>
    );
  }
}
