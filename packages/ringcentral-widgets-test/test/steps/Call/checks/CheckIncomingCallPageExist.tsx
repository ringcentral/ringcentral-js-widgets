import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckIncomingCallPageExistProps {
  exists?: boolean;
}

export const CheckIncomingCallPageExist: StepFunction<
  CheckIncomingCallPageExistProps
> = async ({ exists = true }) => {
  const element = screen.queryByTestId('IncomingCallPanel');
  if (exists) {
    expect(element).toBeInTheDocument();
  } else {
    expect(element).not.toBeInTheDocument();
  }
};
