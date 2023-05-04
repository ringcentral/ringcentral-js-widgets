import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { DropdownDataSign } from '../interface';

export const CheckDropDownExist: StepFunction<{
  dataSign: DropdownDataSign;
}> = async ({ dataSign }) => {
  const dom = screen.getByTestId(dataSign);
  expect(dom).toBeInTheDocument();
};
