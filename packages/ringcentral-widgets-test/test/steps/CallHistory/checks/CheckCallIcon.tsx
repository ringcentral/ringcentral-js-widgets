import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallIcon: StepFunction<{
  disabled?: boolean;
}> = ({ disabled = false }) => {
  const callItem = screen.getAllByTestId('Call')[0];
  expect(callItem).toBeInTheDocument();

  const buttonDisabled = callItem.getAttribute('aria-disabled') !== 'false';

  disabled
    ? expect(buttonDisabled).toBeTruthy()
    : expect(buttonDisabled).toBeFalsy();
};
