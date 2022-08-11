import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckMuteButton: StepFunction = async () => {
  expect(screen.getByText('Mute')).toBeInTheDocument();
  expect(screen.getByTestId('unmute')).toBeInTheDocument();
};
