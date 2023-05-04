import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

// TODO: find better implementation
export const CheckAlertAutoDismiss: StepFunction<{ ttl?: number }> = async ({
  ttl = 5000,
} = {}) => {
  await waitForElementToBeRemoved(
    () => screen.queryAllByTestId('alert'),
    { timeout: ttl + 1000 }, // ttl will add an extra 10 milliseconds by design, so increase 1s here
  );
};
