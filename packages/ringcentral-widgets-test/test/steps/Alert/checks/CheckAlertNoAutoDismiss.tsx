import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

// TODO: find better implementation
export const CheckAlertNoAutoDismiss: StepFunction<{
  ttl?: number;
  length?: number;
  message?: string;
}> = async ({ ttl = 5000, length = 1, message } = {}) => {
  jest.advanceTimersByTime(ttl + 1000);
  await waitForRenderReady();
  if (message) {
    expect(screen.getByText(message)).toBeInTheDocument();
  } else {
    expect(screen.queryAllByTestId('alert').length).toBe(length);
  }
};
