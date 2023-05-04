import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { DropdownDataSign } from '../interface';

export const CheckDropDownSelectedValueIs: StepFunction<{
  dataSign: DropdownDataSign;
  value: string;
}> = async ({ dataSign, value }) => {
  const dropdown = screen.getByTestId(dataSign);
  expect(dropdown).toBeInTheDocument();
  expect(dropdown).toHaveTextContent(value);
};
