import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToMessagesTab: StepFunction = async () => {
  try {
    // under google: the data-sign=messagesTab
    fireEvent.click(screen.getByTestId('messagesTab'));
  } catch (e) {
    // under hubspot: the data-sign=Messages
    fireEvent.click(screen.getByTestId('Messages'));
  }
};
