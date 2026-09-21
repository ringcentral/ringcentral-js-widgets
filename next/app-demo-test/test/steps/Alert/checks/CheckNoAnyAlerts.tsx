import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckNoAnyAlerts: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    expect(screen.queryAllByTestId('Toast')).toHaveLength(0);
  });
};
