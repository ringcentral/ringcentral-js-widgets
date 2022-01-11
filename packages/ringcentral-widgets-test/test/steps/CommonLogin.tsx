import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { StepFunction } from '../lib/step';

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  // TODO: fix type
  getInstance: (...args: any) => Promise<any>;
}

export const CommonLogin: StepFunction<LoginProps> = async (
  { username = 'test', password = 'test', getInstance },
  context,
) => {
  global.instance = await getInstance({});
  const { phone } = context;
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
