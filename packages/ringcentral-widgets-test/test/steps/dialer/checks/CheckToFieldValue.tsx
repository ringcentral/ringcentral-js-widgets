import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckToFieldValue: StepFunction<{
  value: string;
}> = async ({ value }) => {
  expect(screen.getByTestId('recipientsInput')).toHaveValue(value);
};
