import { waitFor, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckAlertMessage: StepFunction<{
  dataSign?: string;
  message: string;
}> = async ({ dataSign = 'alert', message }) => {
  await waitFor(
    () => {
      const alert = screen.queryByTestId(dataSign);
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(message);
    },
    { timeout: 3000 },
  );
};

export const CheckContainsAlertMessage: StepFunction<{
  message: string;
}> = async ({ message }) => {
  await waitFor(
    () => {
      const alerts = screen.queryAllByTestId('alert');
      const myAlert = alerts.find((alert) =>
        alert.textContent?.includes(message),
      );
      expect(myAlert).toHaveTextContent(message);
    },
    { timeout: 3000 },
  );
};
