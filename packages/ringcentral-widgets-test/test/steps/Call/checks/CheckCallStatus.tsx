import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallStatus: StepFunction<{ status: string }> = ({
  status,
}) => {
  const callStatus = screen.getByTestId('callStatus');
  expect(callStatus.textContent).toBe(status);
};
