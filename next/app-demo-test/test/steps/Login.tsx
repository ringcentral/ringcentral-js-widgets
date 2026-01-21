import {
  Auth,
  OAuth,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import { UserGuide } from '@ringcentral-integration/micro-setting/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  waitForRenderReady,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

export interface LoginProps {
  username?: string;
  password?: string;
  isManualLogin?: boolean;
}

export const Login: StepFunction<LoginProps> = async (
  { username = 'test', password = 'test', isManualLogin = false },
  { app },
) => {
  const auth = app.container.got(Auth)!;
  const webphone = app.container.got(Webphone)!;
  const userGuide = app.container.got(UserGuide)!;
  const oAuth = app.container.got(OAuth)!;
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
      expect(auth.loggedIn).toBeTruthy();
    },
    process.env.MOCK_MCP ? { timeout: 100 * 1000 } : {},
  );
  webphone?._webphone?.userAgent.trigger('registered');
  await userGuide?.dismiss();

  await waitForRenderReady();
};
