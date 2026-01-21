/**
 * RCI-6481: New call popups when user's editing a call log_actions
 * https://test_it_domain/test-cases/RCI-6481
 * Preconditions:
 * User is logged into 3rd party
 * User is login CTI app
 * Auto-log call is not turned off
 * There is a call Call1 in the call history
 * CTI is in RingOut mode
 * Entry point(/s):
 * Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call2
 */
import {
  CallingSettings,
  callingOptions,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  userEvent,
  When,
  screen,
  getNodeText,
  common,
} from '@ringcentral-integration/test-utils';

import { MakeInboundCall } from '../../../steps/Call';
import {
  CheckTooltip,
  ClickBackButton,
  HoverItemByDataSign,
} from '../../../steps/Common';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import { CreateMock } from '../../../steps/Mock';

const call1PhoneNumber = '(650) 123-4561';
const call2PhoneNumber = '(650) 123-4562';
const call3PhoneNumber = '(650) 123-4563';

const sessionId1 = '111';
const sessionId2 = '222';
const sessionId3 = '333';

// skip in common because common do not have call log section
@autorun(test.skip)
@it
@p2
@common
@title("New call popups when user's editing a call log_actions")
export class RCI6481Entry1 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  UpdateCallLogPage?: StepFunction<any, any>;
  CheckCallLogTaskIsEdit?: StepFunction<any, any>;
  run() {
    const { Login, CreateMock, UpdateCallLogPage, CheckCallLogTaskIsEdit } =
      this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[CreateMock, Login]}
        />
        <When
          desc="Direct to entry point: Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call2"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId1}
              phoneNumber={call1PhoneNumber}
            />,
            UpdateCallLogPage,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
            />,
          ]}
        />
        <When
          desc="Hover on blue icon"
          action={[
            <HoverItemByDataSign dataSign={'saveDraftAndCreateNewLog'} />,
          ]}
        />
        <Then
          desc="Show tooltip: 'Save draft and create new call log' [L10N]"
          action={[
            <CheckTooltip
              dataSign="saveDraftAndCreateNewLog"
              tooltip="Save draft and create new call log"
              browserTooltip
            />,
          ]}
        />
        <When
          desc="Click blue icon"
          action={[
            () => {
              userEvent.click(screen.getByTestId('saveDraftAndCreateNewLog'));
            },
          ]}
        />
        <Then
          desc="The little popup closes and Log Call page for Call2 displays
										Call log for call1 should be draft with edited value save"
          action={[
            () => {
              expect(
                screen.queryByTestId('notificationModal'),
              ).not.toBeInTheDocument();
              expect(getNodeText(screen.getByTestId('phoneNumber'))).toBe(
                call2PhoneNumber,
              );
            },
            <CheckCallLogTaskIsEdit sessionId={sessionId1} />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@common
@title("New call popups when user's editing a call log_actions")
export class RCI6481Entry2 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock, UpdateCallLogPage, CheckCallLogTaskIsEdit } =
      this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[CreateMock, Login]}
        />
        <When
          desc="Direct to entry point: Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call2"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId1}
              phoneNumber={call1PhoneNumber}
            />,
            UpdateCallLogPage,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
            />,
          ]}
        />
        <When
          desc="Make another inbound call3"
          action={
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId3}
              phoneNumber={call3PhoneNumber}
            />
          }
        />
        <Then
          desc="Should show little popup for call3"
          action={[
            () => {
              expect(
                getNodeText(screen.getByTestId('logNotificationPhoneNumber')),
              ).toBe(call3PhoneNumber);
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
@common
@title("New call popups when user's editing a call log_actions")
export class RCI6481Entry3 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  UpdateCallLogPage?: StepFunction<any, any>;
  CheckCallLogTaskIsEdit?: StepFunction<any, any>;
  run() {
    const { Login, CreateMock, UpdateCallLogPage, CheckCallLogTaskIsEdit } =
      this;
    return (
      <Scenario desc="New call popups when user's editing a call log_actions">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[CreateMock, Login]}
        />
        <When
          desc="Direct to entry point: Open the Call log page of Call1 > Edit call log for Call1 > Make another inbound call2"
          action={[
            (async (_, { app }) => {
              app.container.get(CallingSettings)!.setDataAction({
                callWith: callingOptions.ringout,
              });
            }) as StepFunction,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId1}
              phoneNumber={call1PhoneNumber}
            />,
            UpdateCallLogPage,
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
            />,
          ]}
        />
        <When
          desc="Click the Back button on call log page"
          action={[ClickBackButton]}
        />
        <Then
          desc="Navigate to all calls tab, and call2 is under 'Ongoing calls on my other devices'
										Call log for call1 should be draft with edited value save"
          action={[
            () => {
              expect(getNodeText(screen.getByTestId('listTitle'))).toEqual(
                'Ongoing calls on my other devices',
              );
              expect(
                getNodeText(
                  screen
                    .getByTestId('callList')
                    .querySelectorAll("[data-sign='currentName']")[1]!,
                ),
              ).toEqual('+16501234562');
            },
            <CheckCallLogTaskIsEdit sessionId={sessionId1} />,
          ]}
        />
      </Scenario>
    );
  }
}
