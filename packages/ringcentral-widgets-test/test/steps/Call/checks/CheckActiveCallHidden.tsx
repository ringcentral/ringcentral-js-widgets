import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckActiveCallHidden: StepFunction = async () => {
  await waitFor(
    () => {
      expect(screen.queryByTestId('activeCallPanel')).not.toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
