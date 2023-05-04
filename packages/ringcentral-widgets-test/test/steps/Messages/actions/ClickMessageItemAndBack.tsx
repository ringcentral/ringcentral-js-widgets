import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StepFunction } from '../../../lib/step';

export const ClickMessageItemAndBack: StepFunction = async () => {
  const smsItem = screen.getAllByTestId('unread')[0];

  userEvent.click(smsItem);
  userEvent.click(screen.getByTestId('backButton'));
};
