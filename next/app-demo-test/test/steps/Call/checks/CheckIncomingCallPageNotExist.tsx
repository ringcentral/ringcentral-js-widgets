import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckIncomingCallPageNotExist: StepFunction = async () => {
  expect(screen.queryByTestId('IncomingCallPanel')).not.toBeInTheDocument();
};
