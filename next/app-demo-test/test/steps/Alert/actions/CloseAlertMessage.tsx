import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, queryByTestId, screen } from '@testing-library/react';

export const CloseAlertMessage: StepFunction<{
  message?: string;
}> = async ({ message }) => {
  await whenStateChange(() => {
    expect(screen.queryAllByTestId('Toast')).not.toBeNull();
  });
  jest.useFakeTimers();
  if (screen.queryAllByTestId('Toast').length > 1 && message) {
    // handle when there are multiple alert messages
    const alert = screen.getByText(message, { exact: false })?.parentElement
      ?.parentElement as HTMLElement;
    const dismissBtn =
      alert && (queryByTestId(alert, 'dismiss') as HTMLElement);
    if (dismissBtn) {
      fireEvent.click(dismissBtn);
    }
  } else {
    screen.getAllByTestId('dismiss').forEach((button) => {
      fireEvent.click(button);
    });
  }

  await waitForRenderReady();
  // some timer be very long, we only want all toast be dismissed
  jest.advanceTimersByTime(200);
  jest.useRealTimers();
};
