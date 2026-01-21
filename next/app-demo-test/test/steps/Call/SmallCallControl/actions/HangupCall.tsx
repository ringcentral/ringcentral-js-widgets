import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const HangupCall: StepFunction = async () => {
  fireEvent.click(
    screen
      .getByTestId('smallCallControl')
      .querySelector('[data-sign=hangup] circle')!,
  );
  await whenStateChange(() =>
    expect(screen.queryByTestId('smallCallControl')).toBeNull(),
  );
};

export const ClickHangupCallButton: StepFunction = async () => {
  fireEvent.click(
    screen
      .getByTestId('smallCallControl')
      .querySelector('[data-sign=hangup] circle')!,
  );
};
