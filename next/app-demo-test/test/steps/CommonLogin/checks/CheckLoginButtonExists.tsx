import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckLoginButtonExistsProps {
  exists?: boolean;
}

export const CheckLoginButtonExists: StepFunction<
  CheckLoginButtonExistsProps
> = async ({ exists = true }) => {
  await whenStateOrTimerChange(() => {
    const loginButton = screen.queryByTestId('loginButton');
    if (exists) {
      expect(loginButton).toBeTruthy();
      expect(loginButton).toBeInTheDocument();
    } else {
      expect(loginButton).toBeFalsy();
    }
  });
};
