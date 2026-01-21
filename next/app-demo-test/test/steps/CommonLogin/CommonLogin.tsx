import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ActiveCallControl,
  AudioSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  whenStateChange,
  whenStateOrTimerChange,
} from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { connect } from 'mock-mcp';

import { DEFAULT_DEVICES } from '../../__mock__/mockAudioDevices';
import { TriggerWebphoneEvent } from '../Call';
import {
  CreateInstance as DefaultCreateInstance,
  CreateInstanceProps,
} from '../CreateInstance';
import { MockDevice, MockDeviceProps } from '../Mock/MockDevice';

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
          await whenStateOrTimerChange(() => {
            expect(auth.ready).toBeTruthy();
          });
          if (isMockUserMedia) {
            Object.defineProperties(audioSettings, {
              userMedia: { value: true },
            });
          }
          expect(auth.loggedIn).toBeFalsy();
          expect(screen.queryByTestId('loginButton')).toBeInTheDocument();
          await auth.login({
            username,
            password,
          });
          const mockMcpClient: Awaited<ReturnType<typeof connect>> =
            global.mockMcpClient;
          // wait for all mock mcp requests to be processed
          await mockMcpClient?.waitForPendingRequests();
          await waitForElementToBeRemoved(
            () => screen.getByTestId('loginButton'),
            { timeout: 9000 },
          );
          expect(auth.loggedIn).toBeTruthy();

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
            await whenStateChange(() => {
              const shouldRegisteredWebphone =
                webphone.connecting && webphone._webphone;

              expect(shouldRegisteredWebphone).toBeTruthy();
            });

            return <TriggerWebphoneEvent eventName="registered" />;
          }
        }) as StepFunction
      }
    </>
  );
};
