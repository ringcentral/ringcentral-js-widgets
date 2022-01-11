import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckCallButtonDisabled: StepFunction = () => {
  expect(screen.getByTestId('callButton')).toHaveClass('disabled');
};

export const CheckCallButtonActive: StepFunction = () => {
  expect(screen.getByTestId('callButton')).not.toHaveClass('disabled');
};
