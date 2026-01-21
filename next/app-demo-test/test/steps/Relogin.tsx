import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import { UserGuide } from '@ringcentral-integration/micro-setting/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

import { TriggerWebphoneEvent } from './Call';
import { Logout } from './Logout';

export interface ReloginProps {
  username?: string;
  password?: string;
  shouldMockWebphone?: boolean;
}

export const Relogin: StepFunction<ReloginProps> = async (
  { username = 'test', password = 'test', shouldMockWebphone = true },
  { app },
) => {
  return (
    <>
      <Logout />,
      {
        (async () => {
          const auth = app.container.got(Auth)!;
          const userGuide = app.container.got(UserGuide)!;
          auth.login({
            username,
            password,
          });
          await whenStateChange(() => {
            expect(auth.loggedIn).toBeTruthy();
          });
          await userGuide?.dismiss();
        }) as StepFunction
      }
      {
        (async (_, { app }) => {
          const webphone = app.container.got(Webphone)!;
          const shouldRegisteredWebphone =
            shouldMockWebphone && webphone.connecting && webphone._webphone;
          if (shouldRegisteredWebphone) {
            return <TriggerWebphoneEvent eventName="registered" />;
          }
        }) as StepFunction
      }
    </>
  );
};
