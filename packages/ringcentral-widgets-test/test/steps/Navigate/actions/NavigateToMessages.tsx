import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface NavigateToMessagesTabProps {
  category?: false | 'All' | 'Voice' | 'Fax' | 'Text';
}

export const NavigateToMessagesTab: StepFunction<
  NavigateToMessagesTabProps
> = async ({ category = 'All' }) => {
  fireEvent.click(screen.getByTestId('messagesTab'));
  await waitForRenderReady();

  if (category !== false) {
    fireEvent.click(screen.getByTestId(category));
    await waitForRenderReady();
  }
};
