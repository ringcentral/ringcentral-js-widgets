import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckToastMessage: StepFunction<{
  message: string;
  noExist?: boolean;
}> = async ({ message, noExist }) => {
  if (noExist) {
    await whenStateOrTimerChange(() => {
      const alert = screen.queryByText(message);
      expect(alert).not.toBeInTheDocument();
    });
    return;
  }

  await whenStateOrTimerChange(() => {
    const alert = screen.queryByTestId('notification');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(message);
  });
};

export const CheckContainsToastMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await whenStateOrTimerChange(() => {
    const alerts = screen.queryAllByTestId('notification');
    const myToast = alerts.find((alert) =>
      alert.textContent?.includes(message),
    );
    expect(myToast).toHaveTextContent(message);
  });
};
