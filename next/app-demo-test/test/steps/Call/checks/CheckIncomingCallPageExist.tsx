import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckIncomingCallPageExist: StepFunction = async () => {
  expect(screen.queryByTestId('IncomingCallPanel')).toBeInTheDocument();
};
