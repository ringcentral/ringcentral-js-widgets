import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckMessageToFieldValue: StepFunction<{
  value: string;
}> = async ({ value }) => {
  expect(screen.getByTestId('recipientsInput')).toHaveValue(value);
};
