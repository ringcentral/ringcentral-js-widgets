import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckActiveCallDialPadExist: StepFunction = async () => {
  await waitFor(
    () => {
      expect(screen.getByTestId('activeCallDialPad')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
