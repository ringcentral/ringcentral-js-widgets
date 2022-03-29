import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { waitWithCheck } from '@ringcentral-integration/commons/lib/time';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { StepFunction } from '../lib/step';

afterEach(async () => {
  if (global.instance) {
    const { phone, app, rcMock } = global.instance;
    phone?.webphone?._webphone?.userAgent.removeAllListeners();
    if (phone?.auth.loggedIn) {
      await phone.auth.logout();
      await waitWithCheck(() => !phone.auth.loggedIn);
      expect(phone.auth.loggedIn).toBeFalsy();
    }
    rcMock?.reset();
    app?.unmount();
    global.instance = null;
  }
  if (window.analytics) {
    window.analytics.invoked = false;
  }
});

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  isMockUserMedia?: boolean;
  // TODO: fix type
  getInstance: (...args: any) => Promise<any>;
}

export const CommonLogin: StepFunction<LoginProps> = async (
  { username = 'test', password = 'test', getInstance, ...options },
  context,
) => {
  global.instance = await getInstance(options);
  const { phone } = context;
  const { isMockUserMedia = true } = options;
  if (isMockUserMedia) {
    Object.defineProperties(phone.audioSettings, {
      userMedia: { value: true },
    });
  }
  expect(phone.auth.loggedIn).toBeFalsy();
  mock.reset();
  expect(screen.queryByTestId('loginButton')).toBeInTheDocument();
  await phone.auth.login({
    username,
    password,
  });
  await waitForElementToBeRemoved(() => screen.getByTestId('loginButton'));
  expect(phone.auth.loggedIn).toBeTruthy();
};
