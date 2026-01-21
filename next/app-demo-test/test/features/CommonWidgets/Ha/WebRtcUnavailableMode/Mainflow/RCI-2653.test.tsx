/**
 * RCI-2653: Verify the app enter WebRTC unavailable mode when API return sipProvisionError
 * https://test_it_domain/test-cases/RCI-2653
 * Preconditions:
 * Open the Charles
 * Entry point(/s):
 * Login app with rc account
 */
import {
  AudioSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
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
  screen,
  userEvent,
  UseFakeTimers,
  UseRealTimers,
  AdvanceTimersByTime,
  waitFor,
} from '@ringcentral-integration/test-utils';

import { MockSipProvision, TriggerWebphoneEvent } from '../../../../../steps/Call/Webphone';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock, MockGetStatus } from '../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../steps/Navigate';

@autorun(test)
@common
@p2
@it
@title(
  'Verify the app enter WebRTC unavailable mode when API return sipProvisionError',
)
export class RCI2653 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin
      {...props}
      shouldMockWebphone={false}
      CreateInstance={CreateInstance}
    />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Check webrtc unavailale mode">
        <Given desc="Logged in Third-part APP and CTI" action={[CreateMock]} />
        <When
          desc="simulate sipProvisionError(change https response's error message for request: /restapi/v1.0/client-info/sip-provision
										1change the status code to 500 ( 2change the response text as below {  'errorCode': 'InsufficientPermissions',  'message': ' not available',  'errors': [    {      'errorCode': 'CMN-401',      'message': ' available',      'permissionName': 'VoipCalling'    }  ],  'permissionName': 'VoipCalling'}"
          action={[
            <MockSipProvision
              repeat={1}
              status={500}
              handler={() => {
                return {
                  errorCode: 'InsufficientPermissions',
                  message: 'not available',
                  errors: [
                    {
                      errorCode: 'CMN-401',
                      message: ' available',
                      permissionName: 'VoipCalling',
                    },
                  ],
                  permissionName: 'VoipCalling',
                };
              }}
            />,
            <MockGetStatus status={500} repeat={1} />,
            Login,
            (async (_, { app }) => {
              app.container.got(AudioSettings)!._setStatus('READY');

              // Mock _awaitRealtimeRecovery to avoid waiting for WebSocket in tests
              // This is needed due to MR 27170 which added WebSocket recovery logic
              const webphone = app.container.got(Webphone);
              if (webphone) {
                webphone._awaitRealtimeRecovery = async () => true;
              }
            }) as StepFunction,
          ]}
        />
        <Then
          desc="WebRTC need to reconnect
										Reconnecting Alert message:'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. '
										The app page is loading during reconnecting
										All call buttons are disabled"
          action={[
            NavigateToDialer,
            (async () => {
              // toast get value:'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to RingCentral support.',
              // {"action":"getValue","test_id":"Toast","expected_value":"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to RingCentral support."}
              expect(screen.getByTestId('Toast').textContent).toBe(
                'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to RingCentral support.',
              );
              // All call buttons are disabled,
              // {"action":"getDisableStatus","test_id":"callButton","expected_value":"true"}
              expect(screen.getByTestId('callButton')).toHaveAttribute(
                'aria-disabled',
                'true',
              );
            }) as StepFunction,
          ]}
        />
        <When
          desc="Simulate 2 more sipProvisionError retry to trigger connectError state (total 3 failures)"
          action={[
            <MockSipProvision repeat={2} status={500} />,
            (async (_, { app }) => {
              const webphone = app.container.got(Webphone);
              // Manually trigger 2 more failed connection attempts
              // First attempt already done during login (connectRetryCounts = 1)
              await webphone?._connect(); // connectRetryCounts = 2
              await webphone?._connect(); // connectRetryCounts = 3 (triggers connectError)

              // Wait for connectError state (connectRetryCounts > 2)
              await whenStateChange(() => {
                expect(webphone?.connectRetryCounts).toBeGreaterThan(2);
              });
            }) as StepFunction,
          ]}
        />
        <Then
          desc="'Web Phone Unavailable' badge prompt with retry button
										Reconnect fail Alert message: 'Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support.'
										All call buttons are disabled"
          action={[
            UseRealTimers,
            (async (_, { app }) => {
              // First wait for ConnectivityBadge to appear (indicates retry failed)
              await whenStateChange(() => {
                const connectivityBadge =
                  screen.queryByTestId('ConnectivityBadge');
                expect(connectivityBadge).toBeInTheDocument();
                expect(connectivityBadge?.textContent).toBe(
                  'Web Phone Unavailable',
                );
              });

              // Then check Toast message and call button state
              await whenStateChange(() => {
                const toasts = screen.getAllByTestId('Toast');
                expect(toasts[toasts.length - 1].textContent).toBe(
                  'Sorry, something went wrong on our end. If the error persists, report this error to RingCentral support.',
                );
                // All call buttons are disabled,
                // {"action":"getDisableStatus","test_id":"callButton","expected_value":"true"}
                expect(screen.getByTestId('callButton')).toHaveAttribute(
                  'aria-disabled',
                  'true',
                );
              });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Click the retry button,
          'Web Phone Unavailable' badge turns into 'Connecting',
          After retry, WebRTC register succeed,
          WebRTC connecting badge and retry button disappears
					The alert message disappears
					The call button is enabled
          "
          action={[
            // Set up success mock for sip-provision
            <MockSipProvision repeat={10} status={200} handler={undefined} />,
            UseRealTimers,
            (async (_, { app }) => {
              const webphone = app.container.got(Webphone);

              // Ensure _awaitRealtimeRecovery is still mocked before retry
              if (webphone) {
                webphone._awaitRealtimeRecovery = async () => true;
              }

              // Click the ConnectivityBadge to trigger retry
              // {"action":"click","test_id":"ConnectivityBadge","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('ConnectivityBadge'));

              // Badge get value is Connecting,
              // {"action":"getValue","test_id":"ConnectivityBadge","expected_value":"Connecting"}
              await whenStateChange(() => {
                expect(
                  screen.getByTestId('ConnectivityBadge').textContent,
                ).toBe('Connecting');
              });

              // Wait for webphone to be ready for registration
              await whenStateChange(() => {
                expect(webphone?._webphone?.userAgent).toBeTruthy();
              });
            }) as StepFunction,
            // Trigger registered event to simulate successful SIP registration
            <TriggerWebphoneEvent eventName="registered" />,
            // Wait for successful registration
            (async () => {
              // Wait for Badge to disappear and call button to be enabled
              await waitFor(
                () => {
                  expect(
                    screen.queryByTestId('ConnectivityBadge'),
                  ).not.toBeInTheDocument();
                  expect(screen.queryByTestId('Toast')).not.toBeInTheDocument();

                  // wait for The call button is enabled,
                  // {"action":"getDisableStatus","test_id":"callButton","expected_value":"false","wait_type":"None"}
                  expect(screen.getByTestId('callButton')).not.toBeDisabled();
                },
                { timeout: 5000 },
              );
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
