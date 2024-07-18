import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
import type { DropdownDataSign } from '../interface';

export const CheckDropDownExist: StepFunction<{
  dataSign: DropdownDataSign;
}> = async ({ dataSign }) => {
  const dom = screen.getByTestId(dataSign);
  expect(dom).toBeInTheDocument();
};
