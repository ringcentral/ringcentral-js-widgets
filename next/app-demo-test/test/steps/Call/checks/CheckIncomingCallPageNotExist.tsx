import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckIncomingCallPageNotExist: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    expect(screen.queryByTestId('IncomingCallPanel')).not.toBeInTheDocument();
  });
};
