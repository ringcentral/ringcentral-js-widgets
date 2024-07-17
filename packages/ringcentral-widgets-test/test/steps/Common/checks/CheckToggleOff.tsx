import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckToggleOff: StepFunction<{
  dataSign: string;
}> = async ({ dataSign }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  expect(checkbox.checked).toBe(false);
};
