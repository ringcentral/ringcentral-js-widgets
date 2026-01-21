/**
 * RCI-6206: Action buttons on All Calls tab_Hangup and Transfer
 * https://test_it_domain/test-cases/RCI-6206
 * Preconditions:
 * RC CTI app was installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RC CTI
 * The calling setting is set as the non-webRTC browser
 * Entry point(/s):
 * > Make an outbound call
 */
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import {
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  screen,
  userEvent,
  waitFor,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  MakeOtherDeviceCall,
} from '../../../../../../steps/Call';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockCallLogSync,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

// in widgets, no action buttons on all calls page
// no run in app-demo-test
@autorun(test.skip)
@common
@p2
@it
@title('Action buttons on All Calls tab_Hangup and Transfer')
export class ActionButtonHangup extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check hangup button on all calls page when outbound call">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={GenerateCallHistory({ length: 0 })}
              isDefaultInit
              repeat={1}
            />,
            Login,
          ]}
        />
        <And
          desc="The calling setting is set as the non-webRTC browser"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings).setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
          ]}
        />
        <And
          desc="Entry points:
                Make an outbound call and answer it
                Make the call on hold
                Close call log section"
          action={[
            <MakeOtherDeviceCall
              direction="Outbound"
              status={PartyStatusCode.answered}
              sessionId="123"
              telephonySessionId="123"
            />,
            <NavigateTo path="/calls" />,
          ]}
        />
        <When
          desc="> Direct to entry point> Close call log section
										> Click 'Hangup' button"
          action={[
            <MockCallLogSync
              mockResponse={generateCallLogData({
                result: 'Call Connected',
                sessionId: '123',
                telephonySessionId: '123',
              })}
              repeat={1}
              isDefaultInit={false}
            />,
            <CallButtonBehavior callButtonBehaviorType="hangup" />,
          ]}
        />
        <Then
          desc="The call is disconnected
										The callhas been moved to the History tab
										The status of the call is Missed
										Note(/s): It needs time to wait for the presence from the Platform, maybe 1 minute."
          action={[
            async () => {
              // Go to History page
              // {"action":"click","test_id":"History","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('historyTab'));

              // wait for call item on the page
              // {"action":"wait","wait_type":"Selector","test_id":"calls_item_root","expected_value":"","wait_parameter":"calls_item_root"}
              await waitFor(() => {
                expect(
                  screen.queryByTestId('calls_item_root'),
                ).toBeInTheDocument();
              });
              // Click the log icon
              // {"action":"click","test_id":"log","expected_value":""}

              userEvent.click(await screen.findByTestId('log'));

              // wait for callStatus (data-sign: callStatus)
              // {"action":"wait","wait_type":"Selector","test_id":"callStatus","expected_value":"","wait_parameter":"callStatus"}

              await waitFor(() => {
                expect(screen.queryByTestId('callStatus')).toBeInTheDocument();
              });

              // the call status is 'Call connected'
              // {"action":"getValue","test_id":"callStatus","expected_value":"Call connected"}

              expect(screen.getByTestId('callStatus').textContent).toBe(
                'Call Connected',
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@p2
@it
@title('Action buttons on All Calls tab_Hangup and Transfer')
export class CheckTransferOnCallLogPage extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check transfer button on call log page">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={GenerateCallHistory({ length: 0 })}
              isDefaultInit
              repeat={1}
            />,
            Login,
          ]}
        />
        <And
          desc="The calling setting is set as the non-webRTC browser"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings).setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
          ]}
        />
        <And
          desc="Entry points:
                Make an outbound call
                "
          action={[
            <MakeOtherDeviceCall
              direction="Outbound"
              status={PartyStatusCode.answered}
              sessionId="123"
              telephonySessionId="123"
            />,
            <NavigateTo path="/calls" />,
            async () => {
              userEvent.click(await screen.findByTestId('currentName'));
            },
          ]}
        />
        <When
          desc="> Direct toentry point again
										> Click the 'Transfer' button
                    User has been navigated to Transfer page
                    Click the 'Back' button on Transfer page
                    Click the 'Back' button on call log page
                    Back to all calls page"
          action={[
            <CallButtonBehavior callButtonBehaviorType="transfer" />,
            async () => {
              // wait for 'Transfer',
              // {"action":"wait","wait_type":"Selector","test_id":"transferBtn","expected_value":"Transfer to","wait_parameter":"transferBtn"}

              await waitFor(() => {
                expect(screen.queryByTestId('transferBtn')).toBeInTheDocument();
              });

              // Click the 'Back' button on Transfer page,
              // {"action":"click","test_id":"backButton","expected_value":"","wait_type":"None"}

              userEvent.click(await screen.findByTestId('backButton'));

              // Click the 'Back' button on call log page,
              // {"action":"click","test_id":"backButton","expected_value":"Back","wait_type":"None"}
              userEvent.click(await screen.findByTestId('backButton'));

              // wait for 'All calls'
              // {"action":"wait","wait_type":"Selector","test_id":"allCalls","expected_value":"","wait_parameter":"allCalls"}
              await waitFor(() => {
                expect(screen.queryByTestId('allCalls')).toBeInTheDocument();
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
