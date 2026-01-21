import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckIgnoreButton: StepFunction = async () => {
  expect(screen.getByText('Ignore')).toBeInTheDocument();
  expect(screen.getByTestId('ignore')).toBeInTheDocument();
};
