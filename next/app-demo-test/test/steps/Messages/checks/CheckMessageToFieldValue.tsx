import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMessageToFieldValue: StepFunction<{
  value: string;
}> = async ({ value }) => {
  expect(screen.getByTestId('recipientsInput')).toHaveValue(value);
};
