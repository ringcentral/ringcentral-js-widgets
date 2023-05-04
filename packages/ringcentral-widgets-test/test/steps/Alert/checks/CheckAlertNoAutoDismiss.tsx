import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

// TODO: find better implementation
export const CheckAlertNoAutoDismiss: StepFunction<{
  ttl?: number;
  length?: number;
  message?: string;
}> = async ({ ttl = 5000, length = 1, message } = {}) => {
  jest.advanceTimersByTime(ttl + 1000);
  if (message) {
    expect(screen.getByText(message)).toBeInTheDocument();
  } else {
    expect(screen.queryAllByTestId('alert').length).toBe(length);
  }
};
