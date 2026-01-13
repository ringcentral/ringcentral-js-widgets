import { whenStateChange } from '@ringcentral-integration/core/test';
import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckWhoid: StepFunction<{
  value: string;
  label?: string;
}> = async ({ value, label }) => {
  const whoidField = screen.getByTestId('whoid');
  if (label) {
    expect(whoidField.querySelector('label')).toHaveTextContent(label);
  }

  expect(whoidField.querySelector('input')).toHaveValue(value);
};
