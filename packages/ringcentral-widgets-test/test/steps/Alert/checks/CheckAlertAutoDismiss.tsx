import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

// TODO: find better implementation
export const CheckAlertAutoDismiss: StepFunction<{ ttl?: number }> = async ({
  ttl = 5000,
} = {}) => {
  await waitFor(
    () => {
      expect(screen.queryAllByTestId('alert').length).toBe(0);
    },
    { timeout: ttl + 1000 }, // ttl will add an extra 10 milliseconds by design, so increase 1s here
  );
};
