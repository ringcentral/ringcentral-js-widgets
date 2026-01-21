import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickMessageItemAndBack: StepFunction = async () => {
  const smsItem = screen.getAllByTestId('unread')[0];
  userEvent.click(smsItem);

  userEvent.click(screen.getByTestId('backButton'));
};
