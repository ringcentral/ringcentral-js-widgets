import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export interface CheckCallWithOptionProps {
  optionText: string;
  exists?: boolean;
}

export const CheckCallWithOption: StepFunction<
  CheckCallWithOptionProps
> = async ({ optionText, exists = true }) => {
  const optionElement = within(
    screen.getByTestId('callingSetting'),
  ).queryByText(optionText);
  if (exists) {
    expect(optionElement).toBeInTheDocument();
  } else {
    expect(optionElement).not.toBeInTheDocument();
  }
};
