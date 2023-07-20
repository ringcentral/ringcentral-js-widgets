import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import type { StepFunction } from '../../lib/step';
import type { CreateInstanceProps } from '../CreateInstance';

export interface LoginProps extends CreateInstanceProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  isMockUserMedia?: boolean;
  CreateInstance: StepFunction<CreateInstanceProps>;
}

export const CommonLogin: StepFunction<LoginProps> = async (
  { username = 'test', password = 'test', CreateInstance, ...options },
  context,
) => {
  return (
    <>
      <CreateInstance {...options} />
      {async () => {
        const { phone } = context;
        await waitUntilTo(() => {
          expect(phone.auth.ready).toBeTruthy();
        });
        const { isMockUserMedia = true } = options;
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
        await waitForElementToBeRemoved(
          () => screen.getByTestId('loginButton'),
          { timeout: 9000 },
        );
        expect(phone.auth.loggedIn).toBeTruthy();
        await waitUntilTo(() => {
          if (phone.activeCallControl) {
            expect(phone.activeCallControl.ready).toBeTruthy();
          }
        });
      }}
    </>
  );
};
