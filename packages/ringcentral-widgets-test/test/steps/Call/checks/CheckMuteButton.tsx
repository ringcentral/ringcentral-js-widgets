import { screen } from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '../../../lib/step';

export const CheckMuteButton: StepFunction = async () => {
  await waitForRenderReady();
  expect(screen.getByText('Mute')).toBeInTheDocument();
  expect(screen.getByTestId('unmute')).toBeInTheDocument();
};
