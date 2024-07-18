import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckIncomingCallPageNotExist: StepFunction = async () => {
  expect(screen.queryByTestId('IncomingCallPanel')).not.toBeInTheDocument();
};
