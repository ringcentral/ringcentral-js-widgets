import {
  screen,
  StepFunction,
  within,
} from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';

/**
 * Delete matched contact in 'To' field input
 */
export const DeleteRecipientItem: StepFunction = async () => {
  const recipientItem = screen.getByTestId('recipientItem') as HTMLElement;

  const deleteBtn = within(recipientItem).getByTestId('removeBtn');
  userEvent.click(deleteBtn);
};
