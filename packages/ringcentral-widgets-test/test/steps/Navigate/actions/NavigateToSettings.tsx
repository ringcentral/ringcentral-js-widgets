import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToSettings: StepFunction = async () => {
  const showSettings = screen.queryByTestId('settingsTab');
  if (showSettings) {
    fireEvent.click(showSettings);
    return;
  }

  const moreMenu = screen.queryByTestId('moreMenu');
  if (moreMenu) {
    fireEvent.click(moreMenu);
    await waitForRenderReady();
  }

  fireEvent.click(screen.getByTestId('settingsTab'));
  await waitForRenderReady();

  expect(screen.getByTestId('version')).toBeInTheDocument();
};
