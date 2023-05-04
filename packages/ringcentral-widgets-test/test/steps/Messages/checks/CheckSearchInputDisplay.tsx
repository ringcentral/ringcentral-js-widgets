import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckSearchInputDisplay: StepFunction = () => {
  expect(screen.getByTestId('searchIcon')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
};
