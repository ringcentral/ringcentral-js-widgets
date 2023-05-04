import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckIgnoreButton: StepFunction = async () => {
  expect(screen.getByText('Ignore')).toBeInTheDocument();
  expect(screen.getByTestId('ignore')).toBeInTheDocument();
};
