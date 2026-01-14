import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';
import type { CreateInstanceProps } from '../CreateInstance';

export interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  shouldMockWebphone?: boolean;
  isMockUserMedia?: boolean;
  skipActiveCallControlReadyCheck?: boolean;
}

export interface CommonLoginProps extends LoginProps, CreateInstanceProps {
  CreateInstance: StepFunction<CreateInstanceProps>;
}

export const ExecuteAuthLogin: StepFunction<LoginProps> = async (
  {
    username = 'test',
    password = 'test',
    shouldMockWebphone = true,
    isMockUserMedia = true,
    skipActiveCallControlReadyCheck = false,
  },
  context,
) => {
  const { phone } = context;
  await waitUntilTo(() => {
    expect(phone.auth.ready).toBeTruthy();
  }, {
    timeout: 10000,
  });
  if (isMockUserMedia) {
    Object.defineProperties(phone.audioSettings, {
      userMedia: { value: true },
    });
  }
  expect(phone.auth.loggedIn).toBeFalsy();
  expect(screen.queryByTestId('loginButton')).toBeInTheDocument();
  await phone.auth.login({
    username,
    password,
  });
  await waitForElementToBeRemoved(() => screen.getByTestId('loginButton'), {
    timeout: 9000,
  });
  expect(phone.auth.loggedIn).toBeTruthy();
  if (skipActiveCallControlReadyCheck) {
    await waitUntilTo(() => {
      if (phone.activeCallControl) {
        expect(phone.activeCallControl.ready).toBeTruthy();
      }
    });
  }
  if (shouldMockWebphone) {
    await waitUntilTo(() => {
      if (phone.call.ready) {
        phone.webphone._webphone?.userAgent.trigger?.('registered');
      }
    });
  }
};

export const CommonLogin: StepFunction<CommonLoginProps> = async (
  {
    username = 'test',
    password = 'test',
    shouldMockWebphone = true,
    isMockUserMedia = true,
    CreateInstance,
    skipActiveCallControlReadyCheck = false,
    ...options
  },
  context,
) => {
  return (
    <>
      <CreateInstance shouldMockWebphone={shouldMockWebphone} {...options} />
      <ExecuteAuthLogin
        username={username}
        password={password}
        shouldMockWebphone={shouldMockWebphone}
        isMockUserMedia={isMockUserMedia}
        skipActiveCallControlReadyCheck={skipActiveCallControlReadyCheck}
      />
    </>
  );
};
