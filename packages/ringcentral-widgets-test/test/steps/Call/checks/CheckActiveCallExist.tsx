import { screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const CheckActiveCallExist: StepFunction = async () => {
  await waitFor(
    () => {
      expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
