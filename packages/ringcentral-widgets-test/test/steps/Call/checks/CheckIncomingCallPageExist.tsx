import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckIncomingCallPageExist: StepFunction = async () => {
  expect(screen.queryByTestId('IncomingCallPanel')).toBeInTheDocument();
};
