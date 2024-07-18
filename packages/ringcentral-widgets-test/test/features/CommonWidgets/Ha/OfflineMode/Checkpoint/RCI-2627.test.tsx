/**
 * RCI-2627: Verify the app should recover normal mode when API return 200 when webphone is available
 * https://test_it_domain/test-cases/RCI-2627
 * Preconditions:
 * Open the Charles
 * The webphone is unavailable
 * The app is in the offline mode
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 *
 */
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import {
  And,
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  Given,
  When,
  common,
  WaitForRenderReady,
  UseFakeTimers,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import {
  MakeOutboundCall,
  CheckCallControlPage,
} from '../../../../../steps/Call';
import {
  MockSipProvision,
  TriggerWebphoneEvent,
} from '../../../../../steps/Call/Webphone';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckConnectivityBadge, MockGetStatus } from '../../../../../steps/Ha';
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
import { CheckCallButtonActive } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title(
  'Verify the app should recover normal mode when API return 200 when webphone is available',
)
export class RCI2627 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    let checkConnectionFuncSpy: jest.SpyInstance;
    return (
      <Scenario desc="Verify the app should recover normal mode when API return 200 when webphone is available">
        <Given
          desc="Launch app"
          action={() => [
            CreateMock,
            MockGetPhoneNumber,
            MockMessageSync,
            Login,
            // Select WebRTC mode
            <NavigateTo path="/settings/calling" />,
            <ExpandCallingSettingDropdown />,
            <SelectCallingSetting settingName="Browser" />,
            <ClickSaveButton />,
            <CheckCallWithOption exists optionText={'Browser'} />,
            // Spy on request GET https://pubsub.pubnub.com/time/0
            (_: unknown, context: Context) => {
              const connectivityMonitor: ConnectivityMonitor =
                context.phone.connectivityMonitor;
              checkConnectionFuncSpy = jest
                .spyOn(connectivityMonitor, '_checkConnectionFunc')
                .mockImplementation(jest.fn());
            },
          ]}
        />
        <And
          desc="The webphone is unavailable"
          action={() => [
            // Simulate sipProvisionError -> 500
            <MockSipProvision repeat={1} status={500} />,
            <TriggerWebphoneEvent eventName={'provisionUpdate'} />,
            // Check
            <WaitForRenderReady />,
            <CheckConnectivityBadge
              exists={true}
              textContent={'Web Phone Unavailable'}
            />,
          ]}
        />
        <And
          desc="The app is in the offline mode"
          action={() => [
            // oauth token -> 503
            <MockPostOauthToken
              isDefaultInit={false}
              failure
              repeat={1}
              failureCode={503}
            />,
            // [API Request3] -> 503
            <MockGetStatus
              repeat={1}
              status={503}
              handler={() => {
                throw new Error();
              }}
            />,
            <RefreshToken manualHealthCheck />,
            // Check
            <WaitForRenderReady />,
            <CheckConnectivityBadge exists={true} textContent={'Offline'} />,
          ]}
        />
        <When
          desc="Simulate Refresh token api returns 200 and webphone is available use Charles"
          action={() => [
            // oauth token -> 200
            <MockPostOauthToken
              isDefaultInit={false}
              failure={false}
              repeat={0}
            />,
            // [API Request3] -> 200
            <MockGetStatus repeat={0} status={200} />,
            <RefreshToken manualHealthCheck />,
            // webphone is available
            <MockSipProvision repeat={0} status={200} />,
            <TriggerWebphoneEvent eventName={'provisionUpdate'} />,
            <TriggerWebphoneEvent eventName={'registered'} />,
            // Fake timers
            <UseFakeTimers />,
          ]}
        />
        <Then
          desc="The badge 'Offline' disappear
										All buttons are enabled
										Charles can not capture the request'https://pubsub.pubnub.com/time/0'
										User can make the call"
          action={() => [
            // Badge 'Offline' disappear
            <WaitForRenderReady />,
            <CheckConnectivityBadge exists={false} />,

            // Button enabled
            <NavigateTo path="/dialer" />,
            <CheckCallButtonActive />,

            // No specified request
            () => {
              checkConnectionFuncSpy.mockReset();
              jest.advanceTimersByTime(5000 + 1000);
              jest.useRealTimers();
              expect(checkConnectionFuncSpy).not.toHaveBeenCalled();
            },

            // Can make call
            <MakeOutboundCall phoneNumber={'+18882556247'} />,
            <CheckCallControlPage parsedNumber={'(888) 255-6247'} />,
          ]}
        />
      </Scenario>
    );
  }
}
