import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  waitForRenderReady,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { Webphone } from '../../../src/app/services';

export interface LoginProps {
  username?: string;
  password?: string;
}

export const Login: StepFunction<LoginProps> = async (
  { username = 'test', password = 'test' },
  { app },
) => {
  const auth = app.container.got(Auth)!;
  await whenStateChange(() => {
    expect(auth.ready).toBeTruthy();
  });
  expect(auth.loggedIn).toBeFalsy();
  await auth.login({
    username,
    password,
  });
  await whenStateChange(() => {
    expect(auth.loggedIn).toBeTruthy();
  });

  const webphone = app.container.got(Webphone)!;
  webphone?._webphone?.userAgent.trigger('registered');

  await waitForRenderReady();
};
