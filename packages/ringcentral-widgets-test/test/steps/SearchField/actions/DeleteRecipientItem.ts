import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

/**
 * Delete matched contact in 'To' field input
 */
export const DeleteRecipientItem: StepFunction = async () => {
  const recipientItem = screen.getByTestId('recipientItem') as HTMLElement;

  const deleteBtn = within(recipientItem).getByTestId('removeBtn');
  userEvent.click(deleteBtn);
};
