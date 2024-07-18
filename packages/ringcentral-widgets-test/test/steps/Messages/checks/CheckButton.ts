import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckButtonProps {
  expectDisabled: boolean;
}

export const CheckButton: StepFunction<CheckButtonProps> = async ({
  expectDisabled,
}) => {
  await waitFor(() => {
    expectDisabled
      ? expect(screen.getByTestId('messageButton')).toBeDisabled()
      : expect(screen.getByTestId('messageButton')).not.toBeDisabled();
  });
};
