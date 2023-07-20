import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import {
  screen,
  waitFor,
  fireEvent,
  queryByTestId,
  prettyDOM,
} from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const CloseAlertMessage: StepFunction<{
  message?: string;
}> = async ({ message }, context) => {
  jest.useFakeTimers();
  await waitFor(() => {
    expect(screen.queryAllByTestId('alert')).not.toBeNull();
  });
  if (screen.queryAllByTestId('alert').length > 1 && message) {
    // handle when there are multiple alert messages
    const alert = screen.getByText(message, { exact: false })?.parentElement
      ?.parentElement as HTMLElement;
    const dismissBtn =
      alert && (queryByTestId(alert, 'dismiss') as HTMLElement);
    if (dismissBtn) {
      fireEvent.click(dismissBtn);
    }
  } else {
    fireEvent.click(screen.getByTestId('dismiss'));
  }

  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
