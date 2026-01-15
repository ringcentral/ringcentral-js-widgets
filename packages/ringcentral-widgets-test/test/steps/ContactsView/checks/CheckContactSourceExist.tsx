import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckContactSourceExist: StepFunction<{
  option: string;
  isExist: boolean;
}> = async ({ option, isExist }, { phone }) => {
  const contactSourceList = screen.getByTestId('contactSourceList');
  expect(contactSourceList).toBeInTheDocument();
  if (isExist) {
    expect(within(contactSourceList).getByText(option)).toBeInTheDocument();
  } else {
    expect(
      within(contactSourceList).queryByText(option),
    ).not.toBeInTheDocument();
  }
};
