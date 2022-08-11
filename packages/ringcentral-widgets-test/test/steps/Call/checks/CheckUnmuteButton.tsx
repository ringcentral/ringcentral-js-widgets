import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckUnmuteButton: StepFunction = async () => {
  expect(screen.getByText('Unmute')).toBeInTheDocument();
  expect(screen.getByTestId('mute')).toBeInTheDocument();
};
