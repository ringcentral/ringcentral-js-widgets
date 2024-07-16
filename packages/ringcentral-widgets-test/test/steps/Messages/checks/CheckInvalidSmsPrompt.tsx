import { screen, waitFor } from '@testing-library/react';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const CheckInvalidSmsPrompt: StepFunction = async (
  props,
  context: Context,
) => {
  await waitFor(
    () => {
      expect(screen.queryByTestId('alert')).toHaveTextContent(
        'Please enter a valid phone number',
      );
    },
    { timeout: 3000 },
  );
};
