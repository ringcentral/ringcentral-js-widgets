import * as mock from 'ringcentral-integration/integration-test/mock';
import { StepFunction } from '.';
import { getInstance } from '../lib/getInstance';
import { waitWithCheck } from 'ringcentral-integration/lib/time';

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
}

const Login: StepFunction<LoginProps> = async (props, context) => {
  global.instance = await getInstance({});
  const { phone } = context;
  const username = props.username || 'test';
  const password = props.password || 'test';
  expect(phone.auth.loggedIn).toBeFalsy();
  mock.reset();
  await phone.auth.login({
    username,
    password,
  });
  await waitWithCheck(() => phone.auth.loggedIn);
  expect(phone.auth.loggedIn).toBeTruthy();
};

export { Login };
