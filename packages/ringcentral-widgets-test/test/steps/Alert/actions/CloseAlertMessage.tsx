import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CloseAlertMessage: StepFunction<{
  message?: string;
}> = async ({ message }, context) => {
  jest.useFakeTimers();
  await waitFor(
    () => {
      expect(screen.getByTestId('alert')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
  fireEvent.click(screen.getByTestId('dismiss'));

  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
