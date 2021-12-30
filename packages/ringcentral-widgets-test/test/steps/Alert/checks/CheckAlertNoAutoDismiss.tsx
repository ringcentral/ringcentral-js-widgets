import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

// TODO: find better implementation
export const CheckAlertNoAutoDismiss: StepFunction<{
  ttl?: number;
  length?: number;
}> = async ({ ttl = 5000, length = 1 } = {}) => {
  jest.advanceTimersByTime(ttl + 1000);
  expect(screen.queryAllByTestId('alert').length).toBe(length);
};
