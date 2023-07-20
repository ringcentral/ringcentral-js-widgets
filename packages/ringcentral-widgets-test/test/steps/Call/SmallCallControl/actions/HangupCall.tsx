import { fireEvent, screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

export const HangupCall: StepFunction = async () => {
  fireEvent.click(
    screen
      .getByTestId('smallCallControl')
      .querySelector('[data-sign=hangup] circle'),
  );
  await waitFor(
    () => expect(screen.queryByTestId('smallCallControl')).toBeNull(),
    { timeout: 3000 },
  );
};

export const ClickHangupCallButton: StepFunction = async () => {
  fireEvent.click(
    screen
      .getByTestId('smallCallControl')
      .querySelector('[data-sign=hangup] circle'),
  );
};
