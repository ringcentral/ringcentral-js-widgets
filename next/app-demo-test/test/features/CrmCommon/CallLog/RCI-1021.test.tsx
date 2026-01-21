import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { ModuleStatus } from '@ringcentral-integration/next-core/src/constant';
import { whenStateChange } from '@ringcentral-integration/next-core/test';

/**
 * RCI-1021: New call popups when user's editing a call log_actions
 * https://test_it_domain/test-cases/RCI-1021
 * Preconditions:
 * User is logged into Salesforce
 * User is login CTI app
 * Auto-log call is not turned off
 * There is a call Call1 in the call history
 * CTI is in ringout mode
 * Entry point(/s):
 * Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound > Click 'Log' button on the little popup
 * Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call(Call3) > Click the 'Log' button on little popup > Click the 'Stay on Previous Work' button
 * Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call(Call4) > Click the 'Log' button on little popup > Click the 'Discard & Work on New' button
 * Open the Call log page of Call1 >Edit call log for Call >Make another inbound call(Call7, and keep it on ringing/connected)
 * Open the Call log page of Call1 >Edit call log for Call >Make another inbound call(Call7, and keep it on ringing/connected)
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  fireEvent,
  getNodeText,
  Given,
  it,
  p2,
  Scenario,
  screen,
  Step,
  Then,
  title,
  userEvent,
  When,
} from '@ringcentral-integration/test-utils';

import { MakeInboundCall } from '../../../steps/Call';
import { ClickBackButton, ClickItemByDataSign } from '../../../steps/Common';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockCallLogSync,
} from '../../../steps/Mock';
import { NavigateToHistory } from '../../../steps/Navigate';
import { CheckRoutePathIs, NavigateTo } from '../../../steps/Router';
import {
  CheckCallWithOption,
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../steps/Settings';

const call1PhoneNumber = '+16501234561';
const call1SessionId = '11111111';
const call5PhoneNumber = '+16501234565';
const call6PhoneNumber = '+16501234566';

// skip in common because common do not have call log section
@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log_actions")
@common
export class RCI1021Entry1 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions Entry1">
        <Given
          desc="Logged in Third-part APP and CTI
          Direct to entry 1: Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound > Click Log button on the little popup,"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: call1PhoneNumber,
              })}
            />,
            Login,
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
              // go to call history page,
              // {"action":"click","test_id":"History","expected_value":"","wait_type":"Navigation"}
              userEvent.click(await screen.findByTestId('historyTab'));
              // click log button,
              // {"action":"click","test_id":"log","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('log'));
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1234' },
                },
              );
            }) as StepFunction,
            MakeInboundCall,
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
            },
          ]}
        />
        <Then
          desc="
          'Log' button becomes disabled
										The little popup expands with the following information:
	Text: 'Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?'
										Button: Save & Work on New, highlighted by default
										Button: Discard & Work on New
										Button: Stay on Previous Work
										[L10N]"
          action={[
            (async (_, { app, rcMock }) => {
              expect(
                await screen.findByTestId('expandNotification'),
              ).toHaveAttribute('aria-disabled', 'true');

              // Text: 'Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?'
              // {"action":"getValue","test_id":"confirmationInfo","expected_value":"Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?"}
              expect(screen.getByTestId('confirmationInfo').textContent).toBe(
                'Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?',
              );

              // Check Button: Save & Work on New exist,
              // {"action":"exist","test_id":"saveAndWorkOnNew","expected_value":"true"}
              expect(
                screen.queryByTestId('saveAndWorkOnNew'),
              ).toBeInTheDocument();

              expect(screen.queryByTestId('saveAndWorkOnNew')).toHaveClass(
                'selected',
              );

              // Check Button: Discard & Work on New exist,
              // {"action":"exist","test_id":"discardAndWorkOnNew","expected_value":"true"}
              expect(
                screen.queryByTestId('discardAndWorkOnNew'),
              ).toBeInTheDocument();

              // Check Button: Stay on Previous Work exist,
              // {"action":"exist","test_id":"stayOnPreviousWork","expected_value":"true"}
              expect(
                screen.queryByTestId('stayOnPreviousWork'),
              ).toBeInTheDocument();
            }) as StepFunction,
          ]}
        />
        <When
          desc="Refresh page"
          action={[
            (async (_, { app, rcMock }) => {
              app.container.got(Auth)!['_setStatus'](ModuleStatus.Resetting);
              app.container.got(Auth)!['_setStatus'](ModuleStatus.Ready);
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The little pop up should disappear"
          action={[
            () => {
              expect(
                screen.queryByTestId('notificationModal'),
              ).not.toBeInTheDocument();
            },
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log_actions")
@common
export class RCI1021Entry1Close extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions Entry1 and close notification">
        <Given
          desc="Logged in Third-part APP and CTI
          Direct to entry 1: Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound > Click Log button on the little popup,"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: call1PhoneNumber,
              })}
            />,
            Login,
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
              // go to call history page,
              // {"action":"click","test_id":"History","expected_value":"","wait_type":"Navigation"}
              userEvent.click(await screen.findByTestId('historyTab'));
              // click log button,
              // {"action":"click","test_id":"log","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('log'));
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1234' },
                },
              );
            }) as StepFunction,
            MakeInboundCall,
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
            },
          ]}
        />
        <When
          desc="Direct to entry point 1 again, click 'X' icon"
          action={async () => {
            // click close button
            // {"action":"click","test_id":"closeButton","expected_value":"","wait_type":"None"}
            userEvent.click(await screen.findByTestId('closeButton'));
          }}
        />
        <Then
          desc="The little popup closes and Log Call page is back to editable"
          action={[
            () => {
              expect(
                screen.queryByTestId('notificationModal'),
              ).not.toBeInTheDocument();
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: '666' },
                },
              );
              expect(
                screen.getByTestId('description').querySelector('textarea')!
                  .value,
              ).toEqual('666');
            },
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log_actions")
@common
export class RCI1021Entry2 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions Entry1 and close notification Entry2">
        <Given
          desc="Logged in Third-part APP and CTI
          Direct to entry 2:
          Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call(Call3) > Click the 'Log' button on little popup > Click the 'Stay on Previous Work; button"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: call1PhoneNumber,
              })}
            />,
            Login,
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
              // go to call history page,
              // {"action":"click","test_id":"History","expected_value":"","wait_type":"Navigation"}
              userEvent.click(await screen.findByTestId('historyTab'));
              // click log button,
              // {"action":"click","test_id":"log","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('log'));
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1234' },
                },
              );
            }) as StepFunction,
            MakeInboundCall,
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
              userEvent.click(screen.getByTestId('stayOnPreviousWork'));
            },
          ]}
        />
        <Then
          desc="The little popup closes and Log Call page(Call1) is back to editable"
          action={[
            () => {
              expect(
                screen.queryByTestId('notificationModal'),
              ).not.toBeInTheDocument();
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: '666' },
                },
              );
              expect(
                screen.getByTestId('description').querySelector('textarea')!
                  .value,
              ).toEqual('666');
            },
          ]}
        />
      </Scenario>
    );
  }
}

const call4PhoneNumber = '+16501234564';
const call4SessionId = '44444444';

@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log_actions Entry3")
@common
export class RCI1021Entry3 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  CheckCallLogTaskIsEdit: StepFunction<any, any> = () => {};
  CheckCallLogTaskIsSaved: StepFunction<any, any> = () => {};
  run() {
    const {
      Login,
      CreateMock,
      CheckCallLogTaskIsEdit,
      CheckCallLogTaskIsSaved,
    } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions Entry1 and close notification Entry3">
        <Given
          desc="Logged in Third-part APP and CTI
          Direct to entry 3:
          Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call(Call4) > Click the 'Log' button on little popup > Click the 'Discard & Work on New' button"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: call1PhoneNumber,
                sessionId: '11111111',
              })}
            />,
            Login,
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
              // go to call history page,
              // {"action":"click","test_id":"History","expected_value":"","wait_type":"Navigation"}
              userEvent.click(await screen.findByTestId('historyTab'));
              // click log button,
              // {"action":"click","test_id":"log","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('log'));
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1111' },
                },
              );
            }) as StepFunction,
            <MakeInboundCall
              phoneNumber={call4PhoneNumber}
              sessionId={call4SessionId}
            />,
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
              userEvent.click(screen.getByTestId('discardAndWorkOnNew'));
            },
          ]}
        />
        <Then
          desc="The little popup closes and Log Call page for Call4 displays
										The edits for Call1 is not saved"
          action={[
            (async (_, { app }) => {
              expect(
                screen.queryByTestId('notificationModal'),
              ).not.toBeInTheDocument();
              expect(screen.getByTestId('logName').textContent).toBe(
                call4PhoneNumber,
              );
            }) as StepFunction,
            <CheckCallLogTaskIsSaved isSaved={false} />,
          ]}
        />
        <When
          desc="> Edit call log for Call4
										> Make another inbound call(Call5)
										> Click the 'Log' button on little popup
										> Make another new call(Call6)
										>Click 'Save & Work on New'"
          action={[
            () => {
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1111' },
                },
              );
            },
            <MakeInboundCall phoneNumber={call5PhoneNumber} />,
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
            },
            async () => {
              userEvent.click(screen.getByTestId('saveAndWorkOnNew'));
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('notificationModal'),
                ).not.toBeInTheDocument();
              });
            },
            <MakeInboundCall phoneNumber={call6PhoneNumber} />,
          ]}
        />
        <Then
          desc="Should show little popup for call6"
          action={[
            async () => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('notificationModal'),
                ).toBeInTheDocument();
                expect(getNodeText(screen.getByTestId('logPhoneNumber'))).toBe(
                  '(650) 123-4566',
                );
              });
            },
          ]}
        />
        <When
          desc="Click 'Save & Work on New'"
          action={[
            async () => {
              // click log button on the little pop up,
              // {"action":"click","test_id":"expandNotification","expected_value":"","wait_type":"None"}
              userEvent.click(await screen.findByTestId('expandNotification'));
              userEvent.click(screen.getByTestId('saveAndWorkOnNew'));
            },
          ]}
        />
        <Then
          desc="The little popup closes
										Log Call page for Call6 displays
										The edits for Call4 is saved"
          action={[
            async () => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('notificationModal'),
                ).not.toBeInTheDocument();
                expect(screen.getByTestId('logName').textContent).toBe(
                  call6PhoneNumber,
                );
              });
            },
            <CheckCallLogTaskIsSaved isSaved />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log_actions Entry4")
@common
export class RCI1021Entry4 extends Step {
  call7PhoneNumber = '+16501234567';
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  MakeInboundCall: StepFunction<any, any> = () => (
    <MakeInboundCall phoneNumber={this.call7PhoneNumber} />
  );
  CheckCallLogTaskIsEdit: StepFunction<any, any> = () => {};
  CheckCallLogTaskIsSaved: StepFunction<any, any> = () => {};
  run() {
    const {
      Login,
      CreateMock,
      MakeInboundCall,
      CheckCallLogTaskIsEdit,
      CheckCallLogTaskIsSaved,
    } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions Entry1 and close notification Entry4">
        <Given
          desc="Logged in Third-part APP and CTI
          Direct to entry 4:
          Open the Call log page of Call1 > Edit call log for Call > Make another inbound call(Call7, and keep it on ringing/connected)"
          action={[
            CreateMock,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: call1PhoneNumber,
                sessionId: call1SessionId,
              })}
            />,
            Login,
            // Select RingOut mode
            <NavigateTo path="/settings/calling" />,
            <ExpandCallingSettingDropdown />,
            <SelectCallingSetting settingName="RingOut" />,
            <ClickSaveButton />,
            <CheckCallWithOption exists optionText={'RingOut'} />,
            NavigateToHistory,
            <ClickItemByDataSign dataSign="log" />,
            (async () => {
              fireEvent.change(
                screen.getByTestId('description').querySelector('textarea')!,
                {
                  target: { value: 'test1234' },
                },
              );
            }) as StepFunction,
            MakeInboundCall,
          ]}
        />
        <Then
          desc="click the Back button on call log page
              Navigate to all calls tab
              and call7 is under 'Ongoing calls on my other devices'
							The edited values should be saved to local storage but not save to Salesforce"
          action={[
            ClickBackButton,
            <CheckRoutePathIs path="/calls" />,
            () => {
              expect(getNodeText(screen.getByTestId('listTitle'))).toEqual(
                'Ongoing calls on my other devices',
              );
              expect(
                getNodeText(
                  screen
                    .getByTestId('callList')
                    .querySelector("[data-sign='currentName']")!,
                ),
              ).toEqual(this.call7PhoneNumber);
            },
            <CheckCallLogTaskIsEdit
              description="test1234"
              sessionId={call1SessionId}
            />,
            <CheckCallLogTaskIsSaved isSaved={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
