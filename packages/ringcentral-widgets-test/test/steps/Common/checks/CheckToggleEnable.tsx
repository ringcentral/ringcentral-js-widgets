import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckToggleEnable: StepFunction<{
  dataSign: string;
  isEnabled: boolean;
}> = async ({ dataSign, isEnabled }) => {
  if (isEnabled) {
    expect(screen.getByTestId(dataSign)).not.toHaveClass('disable');
  } else {
    expect(screen.getByTestId(dataSign)).toHaveClass('disable');
  }
};
