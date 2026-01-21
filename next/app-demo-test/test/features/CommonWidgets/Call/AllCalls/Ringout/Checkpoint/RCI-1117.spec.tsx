/**
 * RCI-1117: Action buttons on All Calls tab_Reject
 * https://test_it_domain/test-cases/RCI-1117
 * Preconditions:
 * RC CTI app was installed and enabled
 * The user has logged in to 3rd party
 * The user has logged in to RC CTI
 * The calling setting is set as the non-webRTC browser
 * Entry point(/s):
 * > Make an incoming call and keep it ringing
 * > Close call log section
 */
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import {
  ActiveCallControl,
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
import { ClickBackButton } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockCallLogSync,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router';

// in widgets, no action buttons on all calls page
// not run in app-demo-test
@autorun(test.skip)
@common
@it
@p2
@title('Action buttons on All Calls tab_Reject')
export class ActionButtonReject extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check reject button behavior">
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
            (async (_, { app, rcMock }) => {
              app.container.get(CallingSettings).setDataAction({
                callWith: callingOptions.ringout,
              });
              jest
                .spyOn(app.container.get(ActiveCallControl), 'reject')
                .mockImplementation(async (telephonySessionId: any) => {
                  await rcMock.reject(telephonySessionId);
                });
            }) as StepFunction,
          ]}
        />
        <And
          desc="Entry points:
          > Make an incoming call and keep it ringing
          > Close call log section"
          action={[
            <MockCallLogSync
              mockResponse={generateCallLogData({
                result: 'Missed',
                sessionId: '123',
                telephonySessionId: '123',
              })}
              repeat={1}
              isDefaultInit={false}
            />,
            <MakeOtherDeviceCall
              direction="Inbound"
              status={PartyStatusCode.proceeding}
              sessionId="123"
              telephonySessionId="123"
            />,
            ClickBackButton,
            <NavigateTo path="/calls" />,
          ]}
        />
        <When
          desc="Click the 'Reject' button"
          action={<CallButtonBehavior callButtonBehaviorType="hangup" />}
        />
        <Then
          desc="The call stopped ringing
										The callhas been moved to the History tab
										The status of the callis Rejected
										The callitem is in red color
										Note(/s): It needs time to wait for the presence from the Platform, maybe 1 minute. The call status was returned by service, now the call status is Missed"
          action={async () => {
            // Go to History page,
            // {"action":"click","test_id":"History","expected_value":"","wait_type":"None","wait_parameter":""}
            userEvent.click(await screen.findByTestId('historyTab'));

            // wait for call item(data-sign: calls_item_root)
            // {"action":"wait","wait_type":"Selector","test_id":"calls_item_root","expected_value":"","wait_parameter":"calls_item_root"}
            await waitFor(() => {
              expect(
                screen.queryByTestId('calls_item_root'),
              ).toBeInTheDocument();
            });

            // call icon get title is 'Missed'
            // {"action":"getTitle","test_id":"callIcon","expected_value":"Missed","wait_type":"Selector","wait_parameter":"calls_item_root"}
            expect(screen.getByTestId('callIcon').title).toBe('Missed');
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Action buttons on All Calls tab_Reject')
export class ActionButtonOpen extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check reject button behavior">
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
          > Make an incoming call and keep it ringing
          > Close call log section"
          action={[
            <MakeOtherDeviceCall
              direction="Inbound"
              status={PartyStatusCode.proceeding}
              sessionId="123"
              telephonySessionId="123"
            />,
            ClickBackButton,
            <NavigateTo path="/calls" />,
          ]}
        />
        <When
          desc="> Direct to entry point again
								> Click the left section of the call
                  Call log section of the call should open"
          action={async () => {
            // Click the phone number of the call item
            // {"action":"click","test_id":"currentName","expected_value":"","wait_type":"None"}
            userEvent.click(await screen.findByTestId('currentName'));

            // wait for log section(data-sign:logSection)
            // {"action":"wait","wait_type":"Selector","test_id":"logSection","expected_value":"","wait_parameter":"logSection"}
            await waitFor(() => {
              expect(screen.queryByTestId('logSection')).toBeInTheDocument();
            });
          }}
        />
      </Scenario>
    );
  }
}
