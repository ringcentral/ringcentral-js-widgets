import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckSearchInputDisplay: StepFunction = () => {
  expect(screen.getByTestId('searchIcon')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
};
