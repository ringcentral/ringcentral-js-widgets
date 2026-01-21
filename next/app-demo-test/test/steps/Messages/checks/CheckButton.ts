import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckButtonProps {
  expectDisabled: boolean;
}

export const CheckButton: StepFunction<CheckButtonProps> = async ({
  expectDisabled,
}) => {
  await whenStateChange(() => {
    expectDisabled
      ? expect(screen.getByTestId('messageButton')).toBeDisabled()
      : expect(screen.getByTestId('messageButton')).not.toBeDisabled();
  });
};
