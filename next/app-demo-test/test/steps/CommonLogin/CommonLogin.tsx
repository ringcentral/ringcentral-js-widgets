import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ActiveCallControl,
  AudioSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { UserGuide } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  waitSubscribeSuccess,
  whenStateChange,
  whenStateOrTimerChange,
} from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { connect } from 'mock-mcp';

import { TriggerWebphoneEvent } from '../Call';
import {
  CreateInstance as DefaultCreateInstance,
  CreateInstanceProps,
} from '../CreateInstance';

export interface LoginProps extends CreateInstanceProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  shouldMockWebphone?: boolean;
  isMockUserMedia?: boolean;
  CreateInstance?: StepFunction<CreateInstanceProps>;
  enableSeparateMessageSyncMock?: boolean;
  waitActiveCallControlReady?: boolean;
}

export const CommonLogin: StepFunction<LoginProps> = async ({
  username = 'test',
  password = 'test',
  isMockUserMedia = true,
  shouldMockWebphone = true,
  waitActiveCallControlReady = true,
  CreateInstance = DefaultCreateInstance,
  ...options
}) => {
  return (
    <>
      <CreateInstance {...options} />
      {
        (async (_, { app }) => {
          const auth = app.container.got(Auth)!;
          const audioSettings = app.container.got(AudioSettings)!;
          const activeCallControl = app.container.got(ActiveCallControl)!;
          const userGuide = app.container.got(UserGuide)!;
          await whenStateOrTimerChange(
            () => {
              expect(auth.ready).toBeTruthy();
            },
            {
              // in CI the login process may block by other tests, so we need to set a longer timeout to avoid timeout error
              timeout: global.__CI__ ? 30_000 : 5_000,
            },
          );
          if (isMockUserMedia) {
            Object.defineProperties(audioSettings, {
              userMedia: { value: true },
            });
          }
          if (!auth.loggedIn) {
            await waitForRenderReady();
            await auth.login({
              username,
              password,
            });
            await waitForRenderReady();
            const mockMcpClient: Awaited<ReturnType<typeof connect>> =
              global.mockMcpClient;
            // wait for all mock mcp requests to be processed
            await mockMcpClient?.waitForPendingRequests();
            if (screen.queryByTestId('loginButton')) {
              await waitForElementToBeRemoved(
                () => screen.queryByTestId('loginButton'),
                { timeout: 9000 },
              );
            }
          }
          expect(auth.loggedIn).toBeTruthy();
          await userGuide?.dismiss();
          await waitForRenderReady();

          if (waitActiveCallControlReady) {
            await whenStateChange(() => {
              if (activeCallControl) {
                expect(activeCallControl.ready).toBeTruthy();
              }
            });
          }
        }) as StepFunction
      }
      {
        (async (_, { app }) => {
          if (shouldMockWebphone) {
            const webphone = app.container.got(Webphone)!;
            if (webphone.connected) {
              return;
            }
            await waitSubscribeSuccess(webphone.rcWebphoneInstance$, (it) => {
              expect(it).toBeDefined();
            });

            return <TriggerWebphoneEvent eventName="registered" />;
          }
        }) as StepFunction
      }
    </>
  );
};
