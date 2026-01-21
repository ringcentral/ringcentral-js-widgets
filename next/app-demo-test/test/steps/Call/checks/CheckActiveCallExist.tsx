import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckActiveCallExist: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
  });
};
