import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckIsAddCallPageParams {
  inPage?: boolean;
}

export const CheckIsAddCallPage: StepFunction<
  CheckIsAddCallPageParams
> = async ({ inPage }) => {
  await waitFor(() => {
    const container = screen.queryByTestId('addCallPage');
    if (inPage) {
      expect(container).toBeInTheDocument();
    } else {
      expect(container).not.toBeTruthy();
    }
  });
};
