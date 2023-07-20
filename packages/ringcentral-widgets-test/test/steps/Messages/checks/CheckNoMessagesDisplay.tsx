import { screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const CheckNoMessagesDisplay: StepFunction = async (props, context) => {
  await waitFor(
    () => {
      const hint = screen.getByTestId('noMatch');
      expect(hint).toHaveTextContent('No Messages');
    },
    { timeout: 3000 },
  );
};
