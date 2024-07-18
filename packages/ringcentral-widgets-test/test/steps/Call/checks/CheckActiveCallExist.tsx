import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckActiveCallExist: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
  });
};
