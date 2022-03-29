import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToSettings: StepFunction = async () => {
  const showSettings = screen.queryByTestId('Settings');
  if (showSettings) {
    fireEvent.click(screen.getByTestId('Settings'));
    return;
  }
  // some app "settings" inside at two-level menu
  fireEvent.click(screen.getByTestId('moreMenu'));
  fireEvent.click(await screen.findByTestId('settingsTab'));
};
