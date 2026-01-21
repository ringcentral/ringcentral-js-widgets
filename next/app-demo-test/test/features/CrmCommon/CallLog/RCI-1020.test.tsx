/**
 * RCI-1020: New call popups when user's editing a call log
 * https://test_it_domain/test-cases/RCI-1020
 * Preconditions:
 * User is logged into Dynamiics/Zendesk
 * User is logined CTI app
 * Entry point(/s):
 * Open a call log page
 */
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import {
  ActiveCallControl,
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  fireEvent,
  getByTitle,
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
import { ClickBackButton } from '../../../steps/Common';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import {
  CreateMock,
  generateCallLogData,
  MockCallLogSync,
  MockCallPresence,
} from '../../../steps/Mock';
import {
  CheckRouterNavigation,
  NavigateToHistory,
} from '../../../steps/Navigate';
import { CheckRoutePathIs } from '../../../steps/Router';

const call1PhoneNumber = '(650) 123-4561';
const call2PhoneNumber = '(650) 123-4562';

const sessionId1 = '111';
const sessionId2 = '222';

// skip in common because common do not have call log section
@autorun(test.skip)
@it
@p2
@title("New call popups when user's editing a call log")
@common
export class RCI1020Entry1 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log">
        <Given
          desc="Logged in Third-part APP and CTI"
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
              jest
                .spyOn(
                  app.container.get(ActiveCallControl)!,
                  'sessionIdToTelephonySessionIdMapping',
                  'get',
                )
                .mockReturnValue({ 222: '222' });
            }) as StepFunction,
            NavigateToHistory,
            (async (_, { app }) => {
              userEvent.click(await screen.findByTestId('createLogBtn'));
            }) as StepFunction,
          ]}
        />
        <When
          desc=">Direct to entry point
										> Make an inbound call and keep it on ringing(eg. call1)"
          action={[
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
              telephonySessionId={sessionId2}
            />,
          ]}
        />
        <Then
          desc="There is a little pop up with the following information:
										Inbound call icon
										Entity name
										Formatted number
										'Voicemail' button(not for Zendesk)
										'Log' button
										'X' icon"
          action={[
            async (_, { app }) => {
              await whenStateChange(() => {
                expect(
                  getByTitle(
                    screen.getByTestId('notificationModal'),
                    'Inbound',
                  ),
                ).toBeInTheDocument();
                expect(
                  screen.getByTestId('logNotificationContactName'),
                ).toBeInTheDocument();
                expect(
                  getNodeText(screen.getByTestId('logNotificationPhoneNumber')),
                ).toBe(call2PhoneNumber);
                expect(
                  screen.getByTestId('saveDraftAndCreateNewLog'),
                ).toBeInTheDocument();
                expect(screen.getByTitle('To Voicemail')).toBeInTheDocument();
                expect(screen.getByTestId('closeButton')).toBeInTheDocument();
              });
            },
          ]}
        />
        <When
          desc="> Mouse hover the 'Voicemail' button
										> Clickthe 'Voicemail' button"
          action={[
            () => {
              userEvent.click(screen.getByTitle('To Voicemail'));
            },
          ]}
        />
        <Then
          desc="<ol><li>Tips 'To Voicemail' displays</li><li>The call is sent to voicemail</li><li><span style='background-color: transparent;'>The little popup should be closed</span></li></ol><p><span style='background-color: transparent; color: rgb(29, 98, 201);'> [L10N]</span></p>"
          action={[
            async (_, { app }) => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('notificationModal'),
                ).not.toBeInTheDocument();
                expect(
                  app.container.got(ActiveCallControl).reject,
                ).toHaveBeenCalled();
              });
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
@title("New call popups when user's editing a call log")
@common
export class RCI1020Entry2 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  UpdateCallLogPage?: StepFunction<any, any>;
  run() {
    const { Login, CreateMock, UpdateCallLogPage } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log">
        <Given
          desc="Logged in Third-part APP and CTI"
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
              jest
                .spyOn(
                  app.container.get(ActiveCallControl)!,
                  'sessionIdToTelephonySessionIdMapping',
                  'get',
                )
                .mockReturnValue({ 222: '222' });
            }) as StepFunction,
            NavigateToHistory,
            (async (_, { app }) => {
              userEvent.click(await screen.findByTestId('createLogBtn'));
            }) as StepFunction,
          ]}
        />
        <When
          desc=">Direct to entry point
										> Make an inbound call from the other device"
          action={[
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
              telephonySessionId={sessionId2}
              status={PartyStatusCode.answered}
            />,
          ]}
        />

        <Then
          desc="There is a little pop up with the following information:
                    Inbound call icon
										Entity name
										Formatted number
										'Hangup' button(not for Zendesk)
										'Log' button
										'X' icon
										User's editing is not interrupted
										Inbound call icon
										Entity name
										Formatted number
										'Hangup' button(not for Zendesk)
										'Log' button
										'X' icon"
          action={[
            async (_, { app }) => {
              await whenStateChange(() => {
                expect(
                  getByTitle(
                    screen.getByTestId('notificationModal'),
                    'Inbound',
                  ),
                ).toBeInTheDocument();
                expect(
                  screen.getByTestId('logNotificationContactName'),
                ).toBeInTheDocument();
                expect(
                  getNodeText(screen.getByTestId('logNotificationPhoneNumber')),
                ).toBe(call2PhoneNumber);
                expect(
                  screen.getByTestId('saveDraftAndCreateNewLog'),
                ).toBeInTheDocument();
                expect(screen.getByTitle('Hang up')).toBeInTheDocument();
                expect(screen.getByTestId('closeButton')).toBeInTheDocument();
              });
            },
            UpdateCallLogPage,
          ]}
        />
        <When
          desc="> Hover 'Hangup' button
										> Click the'Hangup' button"
          action={[
            () => {
              userEvent.click(screen.getByTitle('Hangup'));
            },
          ]}
        />
        <Then
          desc="Tips 'Hangup' displays
										Call is disconnected
										The little popup should be closed"
          action={[
            async (_, { app }) => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('notificationModal'),
                ).not.toBeInTheDocument();
                expect(
                  app.container.got(ActiveCallControl).hangUp,
                ).toHaveBeenCalled();
              });
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
@title("New call popups when user's editing a call log")
@common
export class RCI1020Entry3 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  run() {
    const { Login, CreateMock, UpdateCallLogPage } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log">
        <Given
          desc="Logged in Third-part APP and CTI"
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
              jest
                .spyOn(
                  app.container.get(ActiveCallControl)!,
                  'sessionIdToTelephonySessionIdMapping',
                  'get',
                )
                .mockReturnValue({ 222: '222' });
            }) as StepFunction,
            NavigateToHistory,
            (async (_, { app }) => {
              userEvent.click(await screen.findByTestId('createLogBtn'));
            }) as StepFunction,
          ]}
        />
        <When
          desc=">Direct to entry point
							> Click back button of call log page"
          action={[
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
              telephonySessionId={sessionId2}
              status={PartyStatusCode.answered}
            />,
            ClickBackButton,
          ]}
        />
        <Then
          desc="Back to all calls tab
										Log notification popup should disappear"
          action={[
            <CheckRoutePathIs path={'/calls'} />,
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
@title("New call popups when user's editing a call log")
@common
export class RCI1020Entry4 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  UpdateCallLogPage?: StepFunction<any, any>;
  run() {
    const { Login, CreateMock, UpdateCallLogPage } = this;
    return (
      <Scenario desc="New call popups when user's editing a call log">
        <Given
          desc="Logged in Third-part APP and CTI"
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
              jest
                .spyOn(
                  app.container.get(ActiveCallControl)!,
                  'sessionIdToTelephonySessionIdMapping',
                  'get',
                )
                .mockReturnValue({ 222: '222' });
            }) as StepFunction,
            NavigateToHistory,
            (async (_, { app }) => {
              userEvent.click(await screen.findByTestId('createLogBtn'));
            }) as StepFunction,
          ]}
        />
        <When
          desc="> Direct to entry point again
										> Make another inbound call"
          action={[
            <MakeInboundCall
              isWebRTC={false}
              sessionId={sessionId2}
              phoneNumber={call2PhoneNumber}
              telephonySessionId={sessionId2}
              status={PartyStatusCode.answered}
            />,
          ]}
        />
        <Then
          desc="Show log notification popup for latest call"
          action={[
            async (_, { app }) => {
              expect(
                getNodeText(screen.getByTestId('logNotificationPhoneNumber')),
              ).toBe(call2PhoneNumber);
            },
          ]}
        />
        <When
          desc="Click 'X' icon"
          action={[
            () => {
              userEvent.click(screen.getByTestId('closeButton'));
            },
          ]}
        />
        <Then
          desc="The little popup closes"
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
