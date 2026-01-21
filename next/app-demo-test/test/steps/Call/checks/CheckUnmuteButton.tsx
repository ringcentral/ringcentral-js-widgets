import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckUnmuteButton: StepFunction = async () => {
  expect(screen.getByText('Unmute')).toBeInTheDocument();
  expect(screen.getByTestId('mute')).toBeInTheDocument();
};
