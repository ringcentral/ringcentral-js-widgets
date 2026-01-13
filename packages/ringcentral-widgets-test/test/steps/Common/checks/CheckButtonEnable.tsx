import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckButtonEnable: StepFunction<{
  dataSign?: string;
  text?: string;
  isEnabled: boolean;
}> = async ({ dataSign, text, isEnabled }) => {
  const button = dataSign
    ? screen.getByTestId(dataSign)
    : screen.getByRole('button', { name: text! });

  if (isEnabled) {
    expect(button).toBeEnabled();
  } else {
    expect(button).toBeDisabled();
  }
};
