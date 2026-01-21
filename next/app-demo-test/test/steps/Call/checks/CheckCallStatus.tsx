import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallStatus: StepFunction<{ status: string }> = ({
  status,
}) => {
  const callStatus = screen.getByTestId('callStatus');
  expect(callStatus.textContent).toBe(status);
};
