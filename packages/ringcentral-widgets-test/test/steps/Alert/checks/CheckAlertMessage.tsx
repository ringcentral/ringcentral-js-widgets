import { waitFor, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckAlertMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await waitFor(
    () => {
      expect(screen.getByTestId('alert')).toHaveTextContent(message);
    },
    { timeout: 3000 },
  );
};
