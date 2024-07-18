import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckAlertMessage: StepFunction<{
  dataSign?: string;
  message: string;
}> = async ({ dataSign = 'alert', message }) => {
  await whenStateOrTimerChange(() => {
    const [alert] = screen
      .queryAllByTestId(dataSign)
      .filter((i) => i.textContent === message);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(message);
  });
};

export const CheckContainsAlertMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await whenStateOrTimerChange(() => {
    const alerts = screen.queryAllByTestId('alert');
    const myAlert = alerts.find((alert) =>
      alert.textContent?.includes(message),
    );
    expect(myAlert).toHaveTextContent(message);
  });
};
