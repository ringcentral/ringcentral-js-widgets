import { screen } from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import userEvent from '@testing-library/user-event';

export const ClickBackButton = async () => {
  userEvent.click(screen.getByTestId('backButton'));
  await waitForRenderReady();
};
