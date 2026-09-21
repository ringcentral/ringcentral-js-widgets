import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickCallButton: StepFunction = async () => {
  await userEvent.click(screen.getByTestId('callButton'));
  await waitForRenderReady();
};
