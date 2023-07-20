import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToMeeting: StepFunction = async () => {
  const showSettings = screen.queryByTestId('meetingTab');
  if (showSettings) {
    fireEvent.click(screen.getByTestId('meetingTab'));
    return;
  }

  if (screen.queryByTestId('moreMenu')) {
    fireEvent.click(screen.getByTestId('moreMenu'));
    await waitForRenderReady();
  }

  fireEvent.click(screen.getByTestId('meetingTab'));
};
