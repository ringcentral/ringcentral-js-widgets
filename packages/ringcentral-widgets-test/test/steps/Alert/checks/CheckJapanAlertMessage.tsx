import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckJapanAlertMessageProps {
  show: boolean;
}

export const CheckJapanAlertMessage: StepFunction<CheckJapanAlertMessageProps> =
  async ({ show }) => {
    const alerts = screen.queryAllByTestId('alert');
    const hasJapanAlert = !!alerts.find(
      (item) =>
        item.textContent === 'Emergency service is not available in Japan.',
    );
    expect(hasJapanAlert).toBe(show);
  };
