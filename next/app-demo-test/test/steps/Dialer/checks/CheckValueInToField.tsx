import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckValueInToFieldProps {
  inputValue: string;
}

const CheckValueInToField: StepFunction<CheckValueInToFieldProps> = async ({
  inputValue = '',
}) => {
  expect(screen.queryByTestId('recipientsInput')).toHaveValue(inputValue);
};

export { CheckValueInToField };
