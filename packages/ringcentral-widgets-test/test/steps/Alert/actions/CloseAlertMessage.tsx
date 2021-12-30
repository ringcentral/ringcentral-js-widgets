import {
  screen,
  getNodeText,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CloseAlertMessage: StepFunction<{
  message: string;
}> = async ({ message }, context) => {
  await waitFor(
    () => {
      expect(screen.getByTestId('alert')).not.toBeNull();
    },
    { timeout: 3000 },
  );
  fireEvent.click(screen.getByTestId('dismiss'));
};
