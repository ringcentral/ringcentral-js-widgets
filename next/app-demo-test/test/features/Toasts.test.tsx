import {
  Auth,
  ExtensionFeatures,
  RateLimiter,
  TierChecker,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { Meeting } from '@ringcentral-integration/micro-meeting/src/app/services';
import {
  Conversations,
  MessageStore,
} from '@ringcentral-integration/micro-message/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  AdvanceTimersByTime,
  autorun,
  common,
  Given,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  UseFakeTimers,
  UseRealTimers,
  waitForRenderReady,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckAlertMessage,
  CheckNoAnyAlerts,
  CloseAlertMessage,
} from '../steps/Alert';
import { Entry } from '../steps/Entry';
import { Login } from '../steps/Login';

const INSUFFICIENT_PRIVILEGE_MESSAGE =
  'Insufficient privilege. Please contact your account representative for an upgrade.';

const CheckRateLimitToastMessage = (ttl: number): StepFunction => {
  return () => {
    expect(
      screen.getByText(
        `Request limit exceeded. App will resume in ${ttl} seconds.`,
      ),
    ).toBeInTheDocument();
  };
};

const LoginWithInsufficientPrivilege: StepFunction<{
  username?: string;
  password?: string;
}> = async ({ username = 'test', password = 'test' }, { app }) => {
  const auth = app.container.got(Auth)!;
  const toast = app.container.got(Toast)!;

  await whenStateChange(() => {
    expect(auth.ready).toBeTruthy();
  });
  expect(auth.loggedIn).toBeFalsy();

  auth.login({
    username,
    password,
  });

  await whenStateChange(
    () => {
      expect(
        toast.toasts.some(
          ({ message }) => String(message) === INSUFFICIENT_PRIVILEGE_MESSAGE,
        ),
      ).toBeTruthy();
    },
    process.env.MOCK_MCP ? { timeout: 100 * 1000 } : {},
  );

  await waitForRenderReady();
};

@autorun(test)
@common
@title('Check lot of toasts')
export class TestToasts extends Step {
  run() {
    return (
      <Scenario
        desc="User go to the app entry"
        action={
          <Entry
            mocks={[
              (async (_, { app, rcMock }) => {
                rcMock.replaceDefaultInitMock(rcMock.getFeatures, () =>
                  rcMock.get(
                    '/restapi/v1.0/account/:accountId/extension/:extensionId/features',
                    403 as any,
                    {
                      repeat: 1,
                    },
                  ),
                );
              }) as StepFunction,
            ]}
          />
        }
      >
        <Given
          desc="User login app and receive insufficient privilege toast"
          action={LoginWithInsufficientPrivilege}
        />
        <Then
          desc="ConversationsBase Toast"
          action={[
            (async (_, { app }) => {
              const conversations = app.container.got(Conversations)!;
              const result = conversations.updateMessageText(
                Array(1000).fill('example').join(''),
              );
              expect(result).toBeTruthy();
            }) as StepFunction,
            <CheckAlertMessage message="You can enter up to 1,000 characters." />,
            (async (_, { app }) => {
              const conversations = app.container.got(Conversations)!;
              jest
                .spyOn(conversations, 'attachments', 'get')
                .mockReturnValue(Array(1000).fill('example') as any);
              await conversations.addAttachments(Array(11).fill('example'));
            }) as StepFunction,
            <CheckAlertMessage message="Can't be more than 10 attachments per message" />,
          ]}
        />
        <Then
          desc="ExtensionFeatures Toast"
          action={[
            <CheckAlertMessage message={INSUFFICIENT_PRIVILEGE_MESSAGE} />,
            CloseAlertMessage,
            CheckNoAnyAlerts,
            (async (_, { app, rcMock }) => {
              rcMock.getFeatures();
              const extensionFeatures = app.container.got(ExtensionFeatures)!;

              jest
                .spyOn(extensionFeatures['_auth'], 'logout')
                .mockResolvedValue(undefined as any);

              await extensionFeatures['checkIsInsufficientPrivilege']({
                ready: true,
                loggedIn: true,
                readExtensionInfo: false,
                hasData: true,
              });
            }) as StepFunction,
            WaitForRenderReady,
            <CheckAlertMessage message={INSUFFICIENT_PRIVILEGE_MESSAGE} />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('Check lot of toasts2')
export class TestToasts2 extends Step {
  run() {
    return (
      <Scenario
        desc="User go to the app entry"
        action={
          <Entry
            mocks={[
              (async (_, { app, rcMock }) => {
                rcMock.replaceDefaultInitMock(rcMock.getExtension, () =>
                  rcMock.get(
                    '/restapi/v1.0/account/:accountId/extension/:extensionId',
                    403 as any,
                    {
                      repeat: 1,
                    },
                  ),
                );
              }) as StepFunction,
            ]}
          />
        }
      >
        <Given
          desc="User login app and receive insufficient privilege toast"
          action={LoginWithInsufficientPrivilege}
        />
        <Then
          desc="ExtensionInfo Toast"
          action={[
            <CheckAlertMessage message={INSUFFICIENT_PRIVILEGE_MESSAGE} />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('Check lot of toasts3')
export class TestToasts3 extends Step {
  run() {
    return (
      <Scenario desc="User go to the app entry" action={<Entry mocks={[]} />}>
        <Given desc="User login app and go to dialer page" action={Login} />
        <When
          desc="call meeting scheduleDirectly"
          action={[
            CloseAlertMessage,
            CheckNoAnyAlerts,
            UseFakeTimers,
            (async (_, { app }) => {
              const meeting = app.container.got(Meeting)!;
              jest
                .spyOn(meeting, '_scheduleDirectly' as any)
                .mockReturnValue(undefined as any);

              await meeting.scheduleDirectly(undefined, {
                isAlertSuccess: false,
              });
            }) as StepFunction,
            // there is a toast show after 50ms
            <AdvanceTimersByTime ms={50} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then desc="Meeting Toast not show" action={CheckNoAnyAlerts} />
        <When
          desc="call meeting scheduleDirectly"
          action={[
            UseFakeTimers,
            (async (_, { app }) => {
              const meeting = app.container.got(Meeting)!;
              jest
                .spyOn(meeting, '_scheduleDirectly' as any)
                .mockReturnValue(undefined as any);

              await meeting.scheduleDirectly(undefined, {
                isAlertSuccess: true,
              });
            }) as StepFunction,
            // there is a toast show after 50ms
            <AdvanceTimersByTime ms={50} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then
          desc="Meeting Toast"
          action={[<CheckAlertMessage message="Meeting added" />]}
        />
        <When
          desc="call meeting scheduleDirectly"
          action={[
            CloseAlertMessage,
            CheckNoAnyAlerts,
            UseFakeTimers,
            (async (_, { app }) => {
              const meeting = app.container.got(Meeting)!;
              jest.mocked(meeting['_scheduleDirectly']).mockRestore();

              await meeting.scheduleDirectly(undefined, {
                isAlertSuccess: false,
              });
            }) as StepFunction,
            // there is a toast show after 50ms
            <AdvanceTimersByTime ms={50} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then
          desc="Meeting Toast"
          action={[<CheckAlertMessage message="invalid meeting info" />]}
        />
        <When
          desc="call meeting updateMeeting"
          action={[
            UseFakeTimers,
            (async (_, { app }) => {
              const meeting = app.container.got(Meeting)!;
              jest
                .spyOn(meeting, '_isUpdating' as any)
                .mockReturnValue(undefined as any);

              jest
                .spyOn(meeting, '_updateMeeting' as any)
                .mockReturnValue(undefined as any);

              await meeting.updateMeeting('', null as any, {
                isAlertSuccess: true,
              });
            }) as StepFunction,
            // there is a toast show after 50ms
            <AdvanceTimersByTime ms={50} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then
          desc="Meeting Toast"
          action={[<CheckAlertMessage message="Meeting updated" />]}
        />
        <When
          desc="call meeting updateMeeting"
          action={[
            CloseAlertMessage,
            UseFakeTimers,
            (async (_, { app }) => {
              const meeting = app.container.got(Meeting)!;
              jest
                .spyOn(meeting, '_isUpdating' as any)
                .mockReturnValue(undefined as any);

              await meeting.updateMeeting('', null as any, {
                isAlertSuccess: false,
              });
            }) as StepFunction,
            // there is a toast show after 50ms
            <AdvanceTimersByTime ms={50} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then desc="Meeting Toast" action={[CheckNoAnyAlerts]} />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('Check lot of toasts4')
export class TestToasts4 extends Step {
  run() {
    return (
      <Scenario desc="User go to the app entry" action={<Entry mocks={[]} />}>
        <Given desc="User login app and go to dialer page" action={Login} />

        <When
          desc="call MessageStore deleteConversation"
          action={[
            (async (_, { app }) => {
              const messageStore = app.container.got(MessageStore)!;
              jest
                .spyOn(messageStore, 'sendDeleteConversation')
                .mockImplementation(() => {
                  throw new Error('');
                });
              (messageStore as any)._availabilityMonitor = null;

              await messageStore.deleteConversation('');
            }) as StepFunction,
          ]}
        />
        <Then
          desc="MessageStoreBase Toast"
          action={[
            <CheckAlertMessage message="Cannot delete the voicemail due to internal server error." />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('Check lot of toasts5')
export class TestToasts5 extends Step {
  run() {
    return (
      <Scenario desc="User go to the app entry" action={<Entry mocks={[]} />}>
        <Given desc="User login app and go to dialer page" action={Login} />
        <When
          desc="call MessageStore deleteConversation"
          action={[
            (async (_, { app }) => {
              const tierChecker = app.container.got(TierChecker)!;
              await tierChecker['checkIsInvalidTier']({
                ready: true,
                loggedIn: true,
                isCRMEnabled: false,
              });
            }) as StepFunction,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="TierChecker Toast"
          action={[
            <CheckAlertMessage message="Your edition does not support RingCentral Integrations Internal Demo integration. Please contact your account representative to upgrade your RingCentral edition." />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('Check lot of toasts6')
export class TestToasts6 extends Step {
  run() {
    return (
      <Scenario desc="User go to the app entry" action={<Entry mocks={[]} />}>
        <Given desc="User login app and go to dialer page" action={Login} />
        <When
          desc="call RateLimiter showAlert multiple times"
          action={[
            CloseAlertMessage,
            UseFakeTimers,
            (async (_, { app }) => {
              const rateLimiter = app.container.got(RateLimiter)!;

              rateLimiter.showAlert();
              rateLimiter.showAlert();
              rateLimiter.showAlert();
              rateLimiter.showAlert();
              rateLimiter.showAlert();
            }) as StepFunction,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="RateLimiter Toast should only show once"
          action={[
            CheckRateLimitToastMessage(61),
            ((_, { app }) => {
              const alerts = screen.queryAllByTestId('Toast');
              expect(alerts).toHaveLength(1);
            }) as StepFunction,
            <AdvanceTimersByTime ms={1000} />,
            CheckRateLimitToastMessage(60),
            <AdvanceTimersByTime ms={1000} />,
            CheckRateLimitToastMessage(59),
            <AdvanceTimersByTime ms={1000} />,
            CheckRateLimitToastMessage(58),
            <AdvanceTimersByTime ms={1000} />,
            CheckRateLimitToastMessage(57),
            <AdvanceTimersByTime ms={1000} />,
            CheckRateLimitToastMessage(56),
            ((_, { app }) => {
              const alerts = screen.queryAllByTestId('Toast');
              expect(alerts).toHaveLength(1);
            }) as StepFunction,
            ...Array(55)
              .fill(0)
              .map((_, i) => <AdvanceTimersByTime ms={1000} />),
            CheckRateLimitToastMessage(1),
            <AdvanceTimersByTime ms={1000} />,
            WaitForRenderReady,
            CheckNoAnyAlerts,
            UseRealTimers,
          ]}
        />
      </Scenario>
    );
  }
}
