/**
 * RCI-6207: Action buttons on All Calls tab_Hangup and Hold
 * https://test_it_domain/test-cases/RCI-6207
 * Preconditions:
 * RC CTI app was installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RC CTI
 * The calling setting is set as the non-webRTC browser
 * Entry point(/s):
 * > Make an outbound call and answer it
 * > Make the call on hold
 * > Close call log section
 */
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import {
  CallingSettings,
  callingOptions,
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
  waitFor,
  userEvent,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  MakeOtherDeviceCall,
  MockUnholdParty,
} from '../../../../../../steps/Call';
import { GenerateCallHistory } from '../../../../../../steps/CallHistory';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockCallLogSync,
  generateCallLogData,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

// in widgets, no action buttons on all calls page
// not run in app-demo-test
@common
@autorun(test.skip)
@p2
@it
@title('Action buttons on All Calls tab_Hangup and Hold')
export class CheckHangupButton extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check hangup button on all calls page when hold call">
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
              status={PartyStatusCode.hold}
              sessionId="123"
              telephonySessionId="123"
            />,
            <NavigateTo path="/calls" />,
          ]}
        />
        <When
          desc="Click 'Hangup' button"
          action={[
            <MockCallLogSync
              mockResponse={generateCallLogData({
                result: 'Call connected',
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
                The call has been moved to the History tab
                The status of the call is Connected
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
                'Call connected',
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}

@common
@autorun(test.skip)
@p2
@it
@title('Action buttons on All Calls tab_Hangup and Hold')
export class CheckTransferAndHoldButton extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check transfer and hold button on all calls page">
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
              status={PartyStatusCode.hold}
              sessionId="123"
              telephonySessionId="123"
            />,
            <NavigateTo path="/calls" />,
          ]}
        />
        <Then
          desc="Back to all calls tab
										There is 'Current call' section
										There are 'Unhold' and 'Hang up' button
										[L10N]"
          action={async () => {
            // wait for 'Current call' section
            // {"action":"wait","wait_type":"Selector","test_id":"callItem","expected_value":"","wait_parameter":"callItem"}
            await waitFor(() => {
              expect(screen.queryByTestId('callItem')).toBeInTheDocument();
            });

            // There is 'Unhold' button
            // {"action":"wait","wait_type":"Selector","test_id":"unhold","expected_value":"","wait_parameter":"unhold"}
            await waitFor(() => {
              expect(screen.queryByTestId('unhold')).toBeInTheDocument();
            });

            // Wait for 'Hang up' button
            // {"action":"wait","wait_type":"Selector","test_id":"hangup","expected_value":"","wait_parameter":"hangup"}
            await waitFor(() => {
              expect(screen.queryByTestId('hangup')).toBeInTheDocument();
            });
          }}
        />
        <Then
          desc="Click the 'Unhold' button
          There is 'Hold' button
          Click the left section of the call
          The call log section of the call should open
					There is a 'Hold' button
          [L10N]"
          action={[
            MockUnholdParty,
            <CallButtonBehavior callButtonBehaviorType="unhold" />,
          ]}
        />
        <Then
          desc="Click the 'Unhold' button
          There is 'Hold' button
          Click the left section of the call
          The call log section of the call should open
					There is a 'Hold' button
          [L10N]"
          action={[
            async () => {
              // wait for 'Hold' button
              // {"action":"wait","wait_type":"Selector","test_id":"hold","expected_value":"","wait_parameter":"hold"}
              await waitFor(() => {
                expect(screen.queryByTestId('hold')).toBeInTheDocument();
              });

              // Click the phone number of the call item
              // {"action":"click","test_id":"currentName","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('currentName'));

              // wait for log section(data-sign:logSection)
              // {"action":"wait","wait_type":"Selector","test_id":"logSection","expected_value":"","wait_parameter":"logSection"}
              await waitFor(() => {
                expect(screen.queryByTestId('logSection')).toBeInTheDocument();
              });

              await waitFor(() => {
                expect(screen.queryAllByTestId('hold')).not.toHaveLength(0);
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
