import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckJapanAlertMessageProps {
  show: boolean;
}

export const CheckJapanAlertMessage: StepFunction<
  CheckJapanAlertMessageProps
> = async ({ show }) => {
  const alerts = screen.queryAllByTestId('Toast');
  const hasJapanAlert = !!alerts.find(
    (item) =>
      item.textContent === 'Emergency service is not available in Japan.',
  );
  expect(hasJapanAlert).toBe(show);
};
