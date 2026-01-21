import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallButtonDisabled: StepFunction = () => {
  try {
    expect(screen.getByTestId('callButton')).toHaveClass('disabled');
  } catch (error) {
    expect(screen.getByTestId('callButton')).toHaveClass('Mui-disabled');
  }
};

export const CheckCallButtonActive: StepFunction = () => {
  expect(screen.getByTestId('callButton')).not.toHaveClass('disabled');
};
