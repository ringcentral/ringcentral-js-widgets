import { screen } from '@testing-library/react';

import { StepFunction } from '../../lib/step';

export const CheckModalExist: StepFunction<{
  isExist?: boolean;
}> = async ({ isExist = true }) => {
  const modal = screen.getByRole('dialog');

  if (isExist) {
    expect(modal).toBeVisible();
  } else {
    expect(modal).not.toBeVisible();
  }
};
