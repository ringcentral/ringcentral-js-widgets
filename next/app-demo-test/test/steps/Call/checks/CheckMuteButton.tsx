import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMuteButton: StepFunction = async () => {
  await waitForRenderReady();
  expect(screen.getByText('Mute')).toBeInTheDocument();
  expect(screen.getByTestId('unmute')).toBeInTheDocument();
};
