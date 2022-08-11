import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToSettings: StepFunction = async () => {
  const showSettings = screen.queryByTestId('Settings');
  if (showSettings) {
    fireEvent.click(screen.getByTestId('Settings'));
    return;
  }

  if (screen.queryByTestId('moreMenu')) {
    fireEvent.click(screen.getByTestId('moreMenu'));
    await waitForRenderReady();
  }

  fireEvent.click(screen.getByTestId('settingsTab'));
  expect(screen.getByTestId('version')).toBeInTheDocument();
};
