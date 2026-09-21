import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  act,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, queryByTestId, screen } from '@testing-library/react';

export const CloseAlertMessage: StepFunction<{
  message?: string;
}> = async ({ message }) => {
  const toasts = screen.queryAllByTestId('Toast');
  if (toasts.length === 0) {
    return;
  }

  jest.useFakeTimers();
  try {
    if (toasts.length > 1 && message) {
      // handle when there are multiple alert messages
      const alert = screen.getByText(message, { exact: false })?.parentElement
        ?.parentElement as HTMLElement;
      const dismissBtn =
        alert && (queryByTestId(alert, 'dismiss') as HTMLElement);
      if (dismissBtn) {
        fireEvent.click(dismissBtn);
      }
    } else {
      screen.queryAllByTestId('dismiss').forEach((button) => {
        fireEvent.click(button);
      });
    }

    await waitForRenderReady();
    // some timer be very long, we only want all toast be dismissed
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    await waitForRenderReady();
  } finally {
    jest.useRealTimers();
  }

  await whenStateOrTimerChange(() => {
    const alerts = screen.queryAllByTestId('Toast');
    if (message) {
      expect(
        alerts.some((alert) => alert.textContent?.includes(message)),
      ).toBeFalsy();
      return;
    }

    expect(alerts).toHaveLength(0);
  });
};
